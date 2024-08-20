declare module 'sib-api-v3-sdk' {
    export class ApiClient {
      static instance: ApiClient;
      authentications: { [key: string]: { apiKey: string } };
    }
  
    export class ContactsApi {
      // Folder operations
      getFolders(limit?: number, offset?: number, sort?: string): Promise<any>;
      createFolder(createUpdateFolder: CreateUpdateFolder): Promise<any>;
      getFolder(folderId: number): Promise<any>;
      updateFolder(folderId: number, createUpdateFolder: CreateUpdateFolder): Promise<void>;
      deleteFolder(folderId: number): Promise<void>;
      getFolderLists(folderId: number, limit?: number, offset?: number, sort?: string): Promise<any>;
  
      // List operations
      getLists(opts?: GetListsOpts): Promise<any>;
      createList(createList: CreateList): Promise<any>;
      getList(listId: number): Promise<any>;
      updateList(listId: number, updateList: CreateList): Promise<void>;
      deleteList(listId: number): Promise<void>;
      getContactsFromList(listId: number, opts?: GetContactsOpts): Promise<any>;
      addContactToList(listId: number, contactEmails: AddContactToList): Promise<any>;
      removeContactFromList(listId: number, contactEmails: RemoveContactFromList): Promise<any>;

      // Contact operations
      getContacts(limit?: number, offset?: number, sort?: string): Promise<any>; 
      getContactInfo(identifier: string, identifierType?: string): Promise<any>;
      createContact(createContact: CreateContact): Promise<any>;
      updateContact(identifier: string, updateContact: UpdateContact): Promise<void>;
      deleteContact(identifier: string): Promise<void>;
    }
  
    export class CreateUpdateFolder {
      name: string;
    }
  
    export class CreateList {
      name: string;
      folderId: number;
    }
  
    export interface GetListsOpts {
      limit?: number;
      offset?: number;
      sort?: string;
    }

    export class CreateContact {
        email: string;
        attributes: { [key: string]: any };
        listIds?: number[];
        updateEnabled?: boolean;
      }
    
      export class UpdateContact {
        email?: string;
        attributes?: { [key: string]: any };
        listIds?: number[];
        updateEnabled?: boolean;
      }
  
    export class AddContactToList {
      emails: string[];
    }
  
    export class RemoveContactFromList {
      emails: string[];
      all?: string;
    }
  
    export interface GetContactsOpts {
      modifiedSince?: string; 
      limit?: number; 
      offset?: number; 
      sort?: string;
    }

  
    export class TransactionalEmailsApi {
      sendTransacEmail(sendSmtpEmail: SendSmtpEmail): Promise<any>;
    }
  
    export class SendSmtpEmail {
      sender?: { name?: string; email: string };
      to?: { email: string; name?: string }[];
      cc?: { email: string; name?: string }[];
      bcc?: { email: string; name?: string }[];
      htmlContent?: string;
      textContent?: string;
      subject?: string;
      replyTo?: { email: string; name?: string };
      attachment?: { url?: string; content?: string; name: string }[];
      headers?: { [key: string]: string };
      templateId?: number;
      params?: { [key: string]: string };
      messageVersions?: { to: { email: string; name?: string }[]; htmlContent?: string; textContent?: string; subject?: string; params?: { [key: string]: string } }[];
      tags?: string[];
      scheduledAt?: string; // Date-time format (e.g., '2024-08-20T15:00:00.000Z')
      batchId?: string; // UUIDv4 batch id
    }
  
}