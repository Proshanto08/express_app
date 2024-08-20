declare module 'sib-api-v3-sdk' {
    export class ApiClient {
      static instance: ApiClient;
      authentications: { [key: string]: { apiKey: string } };
    }
  
    export class ContactsApi {
      createFolder(data: any): Promise<any>;
    }
  
  }
  