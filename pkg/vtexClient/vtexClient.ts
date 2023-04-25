import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';
import { z } from 'zod';
import { ClientError } from '../error/clientError.js';
import { UnauthorizedError } from '../error/unauthorizedError.js';

type HttpMethod = 'post' | 'get' | 'put' | 'delete';

type SendParams = {
  path: string;
  method: HttpMethod;
  payload: unknown;
};

const vtexErrorSchema = z.object({
  error: z.object({
    code: z.string(),
    message: z.string(),
  }),
});

export class VtexClient {
  private axios: AxiosInstance;

  private baseUrl: string;
  private appKey: string;
  private appToken: string;

  constructor(p: { baseUrl: string; appKey: string; appToken: string }) {
    this.baseUrl = p.baseUrl;
    this.appKey = p.appKey;
    this.appToken = p.appToken;

    this.axios = axios.create();
  }

  async send(params: SendParams): Promise<unknown> {
    const { method, path, payload } = params;
    const fullUrl = `${this.baseUrl}/${path}`;
    const requestConfig: AxiosRequestConfig = {
      headers: {
        'Content-Type': 'application/json',
        'X-VTEX-API-AppKey': this.appKey,
        'X-VTEX-API-AppToken': this.appToken,
      },
    };

    try {
      switch (method) {
        case 'post': {
          const res = await this.axios.post(fullUrl, payload, requestConfig);
          return res.data;
        }
        case 'put': {
          const res = await this.axios.put(fullUrl, payload, requestConfig);
          return res.data;
        }
        case 'get': {
          const res = await this.axios.get(fullUrl, requestConfig);
          return res.data;
        }
        case 'delete': {
          const res = await this.axios.delete(fullUrl, requestConfig);
          return res.data;
        }
        default: {
          throw Error(`Not implemented`);
        }
      }
    } catch (e) {
      if (e instanceof AxiosError) {
        if (e.response?.status === 401) {
          throw new UnauthorizedError(`Vtex unauthorized the request`);
        }

        const data = e.response?.data;
        if (data !== undefined) {
          try {
            const vtexError = vtexErrorSchema.parse(data);
            throw new ClientError(
              `Vtex error: ${vtexError.error.code} - ${vtexError.error.message}`
            );
          } catch {
            throw new ClientError(`Vtex error: ${data}`);
          }
        }
      }

      throw e;
    }
  }
}
