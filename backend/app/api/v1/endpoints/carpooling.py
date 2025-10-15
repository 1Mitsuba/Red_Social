from typing import Any, List, Optional
from fastapi import APIRouter, Depends, HTTPException, Query, Path, Body, status
from app.dependencies import get_current_active_user
from app.models.user import User
from app.schemas.carpooling import (
    RouteCreate,
    RouteUpdate,
    RouteResponse,
    PassengerResponse,
    RouteFilterParams
)
from app.services.carpooling import (
    get_routes,
    get_route_by_id,
    create_new_route,
    update_route,
    delete_route,
    join_route,
    leave_route,
    accept_passenger,
    reject_passenger,
    get_user_routes,
    get_user_rides
)

router = APIRouter()

@router.get("/routes", response_model=List[RouteResponse])
async def read_routes(
    origin: Optional[str] = Query(None, description="Filtrar por lugar de origen"),
    destination: Optional[str] = Query(None, description="Filtrar por destino"),
    day: Optional[str] = Query(None, description="Filtrar por día (lun, mar, mie, jue, vie, sab, dom)"),
    time_from: Optional[str] = Query(None, description="Filtrar por hora desde (formato HH:MM)"),
    time_to: Optional[str] = Query(None, description="Filtrar por hora hasta (formato HH:MM)"),
    skip: int = Query(0, description="Número de rutas a saltar"),
    limit: int = Query(10, description="Número máximo de rutas a devolver"),
    current_user: User = Depends(get_current_active_user)
) -> Any:
    """
    Obtener todas las rutas disponibles con filtros opcionales.
    """
    filters = RouteFilterParams(
        origin=origin,
        destination=destination,
        day=day,
        time_from=time_from,
        time_to=time_to
    )
    routes = await get_routes(
        filters=filters,
        skip=skip,
        limit=limit,
        current_user_id=current_user.id
    )
    return routes

@router.get("/routes/{route_id}", response_model=RouteResponse)
async def read_route(
    route_id: str = Path(..., description="ID de la ruta"),
    current_user: User = Depends(get_current_active_user)
) -> Any:
    """
    Obtener una ruta específica por su ID.
    """
    route = await get_route_by_id(route_id=route_id, current_user_id=current_user.id)
    if not route:
        raise HTTPException(status_code=404, detail="Ruta no encontrada")
    return route

@router.post("/routes", response_model=RouteResponse, status_code=status.HTTP_201_CREATED)
async def create_route(
    route_in: RouteCreate,
    current_user: User = Depends(get_current_active_user)
) -> Any:
    """
    Crear una nueva ruta de carpooling.
    """
    route = await create_new_route(route_in=route_in, user_id=current_user.id)
    return route

@router.put("/routes/{route_id}", response_model=RouteResponse)
async def update_existing_route(
    route_in: RouteUpdate,
    route_id: str = Path(..., description="ID de la ruta"),
    current_user: User = Depends(get_current_active_user)
) -> Any:
    """
    Actualizar una ruta existente.
    Solo el creador de la ruta puede actualizarla.
    """
    route = await get_route_by_id(route_id=route_id)
    if not route:
        raise HTTPException(status_code=404, detail="Ruta no encontrada")
    if route.driver_id != current_user.id:
        raise HTTPException(status_code=403, detail="No tienes permisos para editar esta ruta")
    
    updated_route = await update_route(route_id=route_id, route_in=route_in)
    return updated_route

@router.delete("/routes/{route_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_existing_route(
    route_id: str = Path(..., description="ID de la ruta"),
    current_user: User = Depends(get_current_active_user)
) -> None:
    """
    Eliminar una ruta.
    Solo el creador de la ruta puede eliminarla.
    """
    route = await get_route_by_id(route_id=route_id)
    if not route:
        raise HTTPException(status_code=404, detail="Ruta no encontrada")
    if route.driver_id != current_user.id:
        raise HTTPException(status_code=403, detail="No tienes permisos para eliminar esta ruta")
    
    await delete_route(route_id=route_id)

@router.post("/routes/{route_id}/join", response_model=RouteResponse)
async def join_existing_route(
    route_id: str = Path(..., description="ID de la ruta"),
    current_user: User = Depends(get_current_active_user)
) -> Any:
    """
    Solicitar unirse a una ruta como pasajero.
    """
    route = await get_route_by_id(route_id=route_id)
    if not route:
        raise HTTPException(status_code=404, detail="Ruta no encontrada")
    if route.driver_id == current_user.id:
        raise HTTPException(status_code=400, detail="No puedes unirte a tu propia ruta")
    
    updated_route = await join_route(route_id=route_id, user_id=current_user.id)
    return updated_route

@router.delete("/routes/{route_id}/leave", status_code=status.HTTP_200_OK)
async def leave_existing_route(
    route_id: str = Path(..., description="ID de la ruta"),
    current_user: User = Depends(get_current_active_user)
) -> Any:
    """
    Abandonar una ruta como pasajero.
    """
    route = await get_route_by_id(route_id=route_id)
    if not route:
        raise HTTPException(status_code=404, detail="Ruta no encontrada")
    
    await leave_route(route_id=route_id, user_id=current_user.id)
    return {"message": "Has abandonado la ruta correctamente"}

@router.put("/routes/{route_id}/passengers/{user_id}/accept", response_model=PassengerResponse)
async def accept_route_passenger(
    route_id: str = Path(..., description="ID de la ruta"),
    user_id: str = Path(..., description="ID del usuario a aceptar"),
    current_user: User = Depends(get_current_active_user)
) -> Any:
    """
    Aceptar a un pasajero en la ruta.
    Solo el conductor puede aceptar pasajeros.
    """
    route = await get_route_by_id(route_id=route_id)
    if not route:
        raise HTTPException(status_code=404, detail="Ruta no encontrada")
    if route.driver_id != current_user.id:
        raise HTTPException(status_code=403, detail="Solo el conductor puede aceptar pasajeros")
    
    passenger = await accept_passenger(route_id=route_id, user_id=user_id)
    return passenger

@router.put("/routes/{route_id}/passengers/{user_id}/reject", status_code=status.HTTP_200_OK)
async def reject_route_passenger(
    route_id: str = Path(..., description="ID de la ruta"),
    user_id: str = Path(..., description="ID del usuario a rechazar"),
    current_user: User = Depends(get_current_active_user)
) -> Any:
    """
    Rechazar a un pasajero en la ruta.
    Solo el conductor puede rechazar pasajeros.
    """
    route = await get_route_by_id(route_id=route_id)
    if not route:
        raise HTTPException(status_code=404, detail="Ruta no encontrada")
    if route.driver_id != current_user.id:
        raise HTTPException(status_code=403, detail="Solo el conductor puede rechazar pasajeros")
    
    await reject_passenger(route_id=route_id, user_id=user_id)
    return {"message": "Pasajero rechazado correctamente"}

@router.get("/my-routes", response_model=List[RouteResponse])
async def read_user_routes(
    current_user: User = Depends(get_current_active_user)
) -> Any:
    """
    Obtener todas las rutas creadas por el usuario actual.
    """
    routes = await get_user_routes(user_id=current_user.id)
    return routes

@router.get("/my-rides", response_model=List[RouteResponse])
async def read_user_rides(
    current_user: User = Depends(get_current_active_user)
) -> Any:
    """
    Obtener todas las rutas en las que el usuario actual participa como pasajero.
    """
    rides = await get_user_rides(user_id=current_user.id)
    return rides
