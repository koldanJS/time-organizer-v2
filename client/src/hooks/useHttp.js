import { useState, useCallback } from "react";

export const useHttp = () => {
  //Создаем состояние в хуке
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  //Эта ф/я будет делать все http запросы
  const request = useCallback(
    async (url, method = "GET", body = null, headers = {}) => {
      setLoading(true);
      try {
        const baseUrl = "http://18.157.239.114";
        //Чтоб body отправлялся как строка (иначе стандартный toString преобразует в [object Object])
        if (body) {
          body = JSON.stringify(body);
          headers["Content-Type"] = "application/json";
        }
        const response = await fetch(`${baseUrl}${url}`, {
          method,
          body,
          headers,
        });
        const data = await response.json();
        //Если не ОК
        if (!response.ok) {
          //Генерируем ошибку
          throw new Error(data.message || "Что-то пошло не так");
        }
        return data;
      } catch (e) {
        setError(e.message);
        //Чтоб обработать ошибку в компонентах, выкидываем ее
        throw e;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const clearError = useCallback(() => setError(null), []);

  return { loading, error, request, clearError };
};
