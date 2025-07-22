const API_BASE = 'https://localhost:4000';

// Для получения списка статей
export const getArticles = async () => {
  try {
    const response = await fetch(`${API_BASE}/articles`);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error('Ошибка при загрузке статей:', error);
    throw error;
  }
};

// Для получения конкретной статьи
export const getArticleById = async (id) => {
  try {
    const response = await fetch(`${API_BASE}/articles/${id}`);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error(`Ошибка при загрузке статьи ${id}:`, error);
    throw error;
  }
};

// Новый метод для создания статьи
export const createArticle = async (formData) => {
  try {
    const response = await fetch(`${API_BASE}/articles`, {
      method: 'POST',
      body: formData, // FormData с текстовыми полями и (опционально) файлом изображения
      // Не нужно явно указывать Content-Type для FormData!
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Не удалось создать статью');
    }

    return await response.json();
  } catch (error) {
    console.error('Ошибка при создании статьи:', error);
    throw error;
  }
};

export const updateArticle = async (id, articleData) => {
  try {
    const response = await fetch(`${API_BASE}/articles/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: articleData.title,
        content: articleData.content,
        author: articleData.author || null,
        imageUrl: articleData.imageUrl || null
      })
    });

    // Обрабатываем успешный пустой ответ (204)
    if (response.status === 204) {
      return { success: true };
    }

    // Обрабатываем ответ с данными
    if (response.ok) {
      // Проверяем, есть ли тело ответа
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        return await response.json();
      }
      return { success: true };
    }

    // Обработка ошибок
    let errorData;
    try {
      errorData = await response.json();
    } catch (e) {
      errorData = { message: `HTTP error ${response.status}` };
    }

    throw new Error(
      errorData.errors?.Title?.[0] ||
      errorData.errors?.Content?.[0] ||
      errorData.message ||
      'Не удалось обновить статью'
    );
  } catch (error) {
    console.error('Ошибка обновления:', {
      error: error.message,
      id,
      articleData
    });
    throw error;
  }
};

export const deleteArticle = async (id) => {
  try {
    const response = await fetch(`${API_BASE}/articles/${id}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });

    if (!response.ok) throw new Error('Ошибка удаления');
    return true;
  } catch (error) {
    console.error('Delete error:', error);
    throw error;
  }
};