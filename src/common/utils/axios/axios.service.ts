import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

@Injectable()
export class AxiosService {
  private readonly axiosInstance = axios.create();

  async request<T>(config: AxiosRequestConfig): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.axiosInstance.request(config);
      return response.data;
    } catch (error) {
      if (error.response) {
        let message = error.response.data;
        if (error.response.status === 404) {
            message = 'Resource not found'
        };

        // The request was made and the server responded with a status code that falls out of the range of 2xx
        throw new HttpException(message, error.response.status);
      } else if (error?.request) {
        // The request was made but no response was received
        throw new HttpException('No response received from the server', HttpStatus.SERVICE_UNAVAILABLE);
      } else {
        // Something happened in setting up the request that triggered an Error
        throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }

  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: 'GET', url });
  }

  async post<T>(url: string, data: any, config?: AxiosRequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: 'POST', url, data });
  }

  async put<T>(url: string, data: any, config?: AxiosRequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: 'PUT', url, data });
  }

  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: 'DELETE', url });
  }
}
