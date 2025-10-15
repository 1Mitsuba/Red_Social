from typing import Any, List
from fastapi import APIRouter, Depends, HTTPException, Query, Path, Body, status
from app.dependencies import get_current_active_user, get_optional_current_user
from app.models.user import User
from app.schemas.social import (
    PostCreate,
    PostUpdate,
    PostResponse,
    CommentCreate,
    CommentResponse,
    MessageCreate,
    MessageResponse,
    ConversationResponse
)
from app.services.social import (
    get_posts,
    get_post_by_id,
    create_new_post,
    update_post,
    delete_post,
    like_post,
    unlike_post,
    get_post_comments,
    create_post_comment,
    delete_comment,
    get_user_messages,
    send_user_message,
    get_user_conversations
)

router = APIRouter()

# Endpoints para publicaciones
@router.get("/posts", response_model=List[PostResponse])
async def read_posts(
    skip: int = Query(0, description="Número de posts a saltar"),
    limit: int = Query(10, description="Número máximo de posts a devolver"),
    current_user: User = Depends(get_optional_current_user)
) -> Any:
    """
    Obtener lista de publicaciones.
    No requiere autenticación, pero si el usuario está autenticado, muestra información adicional.
    """
    posts = await get_posts(skip=skip, limit=limit, current_user_id=current_user.id if current_user else None)
    return posts

@router.get("/posts/{post_id}", response_model=PostResponse)
async def read_post(
    post_id: str = Path(..., description="ID de la publicación"),
    current_user: User = Depends(get_optional_current_user)
) -> Any:
    """
    Obtener una publicación específica por su ID.
    """
    post = await get_post_by_id(post_id=post_id, current_user_id=current_user.id if current_user else None)
    if not post:
        raise HTTPException(status_code=404, detail="Publicación no encontrada")
    return post

@router.post("/posts", response_model=PostResponse, status_code=status.HTTP_201_CREATED)
async def create_post(
    post_in: PostCreate,
    current_user: User = Depends(get_current_active_user)
) -> Any:
    """
    Crear una nueva publicación.
    """
    post = await create_new_post(post_in=post_in, user_id=current_user.id)
    return post

@router.put("/posts/{post_id}", response_model=PostResponse)
async def update_existing_post(
    post_in: PostUpdate,
    post_id: str = Path(..., description="ID de la publicación"),
    current_user: User = Depends(get_current_active_user)
) -> Any:
    """
    Actualizar una publicación.
    Solo el autor puede actualizar su publicación.
    """
    post = await get_post_by_id(post_id=post_id)
    if not post:
        raise HTTPException(status_code=404, detail="Publicación no encontrada")
    if post.author_id != current_user.id:
        raise HTTPException(status_code=403, detail="No tienes permisos para editar esta publicación")
    
    updated_post = await update_post(post_id=post_id, post_in=post_in)
    return updated_post

@router.delete("/posts/{post_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_existing_post(
    post_id: str = Path(..., description="ID de la publicación"),
    current_user: User = Depends(get_current_active_user)
) -> None:
    """
    Eliminar una publicación.
    Solo el autor puede eliminar su publicación.
    """
    post = await get_post_by_id(post_id=post_id)
    if not post:
        raise HTTPException(status_code=404, detail="Publicación no encontrada")
    if post.author_id != current_user.id:
        raise HTTPException(status_code=403, detail="No tienes permisos para eliminar esta publicación")
    
    await delete_post(post_id=post_id)

# Endpoints para likes
@router.post("/posts/{post_id}/like", status_code=status.HTTP_200_OK)
async def like_existing_post(
    post_id: str = Path(..., description="ID de la publicación"),
    current_user: User = Depends(get_current_active_user)
) -> Any:
    """
    Dar like a una publicación.
    """
    post = await get_post_by_id(post_id=post_id)
    if not post:
        raise HTTPException(status_code=404, detail="Publicación no encontrada")
    
    await like_post(post_id=post_id, user_id=current_user.id)
    return {"message": "Like agregado correctamente"}

@router.delete("/posts/{post_id}/like", status_code=status.HTTP_200_OK)
async def unlike_existing_post(
    post_id: str = Path(..., description="ID de la publicación"),
    current_user: User = Depends(get_current_active_user)
) -> Any:
    """
    Quitar like a una publicación.
    """
    post = await get_post_by_id(post_id=post_id)
    if not post:
        raise HTTPException(status_code=404, detail="Publicación no encontrada")
    
    await unlike_post(post_id=post_id, user_id=current_user.id)
    return {"message": "Like eliminado correctamente"}

# Endpoints para comentarios
@router.get("/posts/{post_id}/comments", response_model=List[CommentResponse])
async def read_comments(
    post_id: str = Path(..., description="ID de la publicación"),
    skip: int = Query(0, description="Número de comentarios a saltar"),
    limit: int = Query(10, description="Número máximo de comentarios a devolver"),
    current_user: User = Depends(get_optional_current_user)
) -> Any:
    """
    Obtener comentarios de una publicación.
    """
    post = await get_post_by_id(post_id=post_id)
    if not post:
        raise HTTPException(status_code=404, detail="Publicación no encontrada")
    
    comments = await get_post_comments(
        post_id=post_id, 
        skip=skip, 
        limit=limit,
        current_user_id=current_user.id if current_user else None
    )
    return comments

@router.post("/posts/{post_id}/comments", response_model=CommentResponse, status_code=status.HTTP_201_CREATED)
async def create_comment(
    comment_in: CommentCreate,
    post_id: str = Path(..., description="ID de la publicación"),
    current_user: User = Depends(get_current_active_user)
) -> Any:
    """
    Crear un comentario en una publicación.
    """
    post = await get_post_by_id(post_id=post_id)
    if not post:
        raise HTTPException(status_code=404, detail="Publicación no encontrada")
    
    comment = await create_post_comment(
        post_id=post_id,
        comment_in=comment_in,
        user_id=current_user.id
    )
    return comment

@router.delete("/comments/{comment_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_existing_comment(
    comment_id: str = Path(..., description="ID del comentario"),
    current_user: User = Depends(get_current_active_user)
) -> None:
    """
    Eliminar un comentario.
    Solo el autor del comentario puede eliminarlo.
    """
    # Aquí verificaríamos que el comentario existe y que el usuario es el autor
    await delete_comment(comment_id=comment_id, user_id=current_user.id)

# Endpoints para mensajes
@router.get("/conversations", response_model=List[ConversationResponse])
async def read_conversations(
    current_user: User = Depends(get_current_active_user)
) -> Any:
    """
    Obtener todas las conversaciones del usuario.
    """
    conversations = await get_user_conversations(user_id=current_user.id)
    return conversations

@router.get("/messages/{user_id}", response_model=List[MessageResponse])
async def read_messages(
    user_id: str = Path(..., description="ID del usuario con quien se intercambian mensajes"),
    current_user: User = Depends(get_current_active_user)
) -> Any:
    """
    Obtener mensajes intercambiados con otro usuario.
    """
    messages = await get_user_messages(user_id=user_id, current_user_id=current_user.id)
    return messages

@router.post("/messages/{user_id}", response_model=MessageResponse, status_code=status.HTTP_201_CREATED)
async def send_message(
    message_in: MessageCreate,
    user_id: str = Path(..., description="ID del usuario al que se envía el mensaje"),
    current_user: User = Depends(get_current_active_user)
) -> Any:
    """
    Enviar un mensaje a otro usuario.
    """
    message = await send_user_message(
        to_user_id=user_id,
        message_in=message_in,
        from_user_id=current_user.id
    )
    return message
