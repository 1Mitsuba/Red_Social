from pydantic import BaseModel, Field
from typing import Optional, List, Dict, Any
from datetime import datetime
from enum import Enum

class PostType(str, Enum):
    """
    Tipos de publicaciones
    """
    TEXT = "texto"
    IMAGE = "imagen"
    POLL = "encuesta"
    ACADEMIC = "academico"

class ReactionType(str, Enum):
    """
    Tipos de reacciones
    """
    LIKE = "like"
    LOVE = "love"
    LAUGH = "laugh"
    WOW = "wow"
    SAD = "sad"
    ANGRY = "angry"

class PostBase(BaseModel):
    """
    Modelo base para publicaciones
    """
    contenido: str = Field(..., min_length=1, max_length=2000)
    tipo: PostType = PostType.TEXT
    imagen_url: Optional[str] = None

class PostCreate(PostBase):
    """
    Datos para crear una publicación
    """
    pass

class PostUpdate(BaseModel):
    """
    Datos para actualizar una publicación
    """
    contenido: Optional[str] = Field(None, min_length=1, max_length=2000)
    imagen_url: Optional[str] = None

class PostResponse(PostBase):
    """
    Respuesta de publicación
    """
    id: str
    author_id: str
    author_name: str
    author_avatar: Optional[str] = None
    created_at: datetime
    updated_at: Optional[datetime] = None
    likes_count: int
    comments_count: int
    user_reaction: Optional[str] = None
    
    class Config:
        orm_mode = True

class CommentBase(BaseModel):
    """
    Modelo base para comentarios
    """
    contenido: str = Field(..., min_length=1, max_length=500)

class CommentCreate(CommentBase):
    """
    Datos para crear un comentario
    """
    pass

class CommentResponse(CommentBase):
    """
    Respuesta de comentario
    """
    id: str
    author_id: str
    author_name: str
    author_avatar: Optional[str] = None
    post_id: str
    created_at: datetime
    likes_count: int
    user_reaction: Optional[str] = None
    
    class Config:
        orm_mode = True

class MessageBase(BaseModel):
    """
    Modelo base para mensajes
    """
    contenido: str = Field(..., min_length=1, max_length=1000)
    imagen_url: Optional[str] = None

class MessageCreate(MessageBase):
    """
    Datos para crear un mensaje
    """
    pass

class MessageResponse(MessageBase):
    """
    Respuesta de mensaje
    """
    id: str
    from_user_id: str
    to_user_id: str
    from_user_name: str
    to_user_name: str
    from_user_avatar: Optional[str] = None
    to_user_avatar: Optional[str] = None
    created_at: datetime
    is_read: bool
    
    class Config:
        orm_mode = True

class ConversationResponse(BaseModel):
    """
    Respuesta de conversación
    """
    user_id: str
    user_name: str
    user_avatar: Optional[str] = None
    last_message: str
    last_message_time: datetime
    unread_count: int
    
    class Config:
        orm_mode = True
