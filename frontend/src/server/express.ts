// Base URL for the backend API, using an environment variable or defaulting to
// localhost
const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001';

// Basic type for API responses
type ApiResponse<T> = {
  data: T; status: number;
};


export const expressAPI = {
  /**
   * GET request to fetch data from the server.
   * @param url - The endpoint to send the GET request to.
   * @returns The response data as JSON.
   */
  get: async (url: string) => {
    try {
      const response = await fetch(`${baseUrl}${url}`);
      if (!response.ok) {
        throw new Error(`${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      throw error;
    }
  },

  /**
   * POST request to create data on the server.
   * @param url - The endpoint to send the POST request to.
   * @param data - The data to send in the body of the POST request.
   * @returns The response data as JSON.
   */
  post: async (url: string, data: any) => {
    try {
      const response = await fetch(`${baseUrl}${url}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error(`${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      throw error;
    }
  },

  /**
   * PUT request to update data on the server.
   * @param url - The endpoint to send the PUT request to.
   * @param data - The data to send in the body of the PUT request.
   * @returns The response data as JSON.
   */
  put: async (url: string, data: any) => {
    try {
      const response = await fetch(`${baseUrl}${url}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error(`${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      throw error;
    }
  },

  /**
   * DELETE request to remove data from the server.
   * @param url - The endpoint to send the DELETE request to.
   * @returns The response data as JSON.
   */
  delete: async (url: string) => {
    try {
      const response = await fetch(`${baseUrl}${url}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error(`${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      throw error;
    }
  },
};