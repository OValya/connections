
export interface Group {
      id: {
        S: string // group id
      },
      name: {
        S: string // group name
      },
      createdAt: {
        S: string // unix timestamp when group was created
      },
      createdBy: {
        S: string // user id who created this group
      }
}

export interface GroupList {
  Count: number;
  Items: Group[]
}

export interface PeopleList{
  Count:number;
  Items:Profile[] //??
}




export interface GroupMessageList{
  Count:number,
  Items: GroupMessage[]
}

export interface GroupMessage{
      authorID: {
        S: string // id of the author of the message
      },
      message: {
        S: string // message text
      },
      createdAt: {
        S: string // unix timestamp when message was sent
      }
}

export  interface GroupMessageWithName{
  message:GroupMessage;
  authorName:string;
  authorId:string
}

export interface Message {
  authorID: string,
  message: string,
  createdAt: string
}

export interface Profile {
  email: {
    S:string},
  name:{
    S:string};
  uid: {
    S:string};
  createdAt: {
    S:string}; // unix timestamp in milliseconds
}

export interface UserWithConversation{
  name:string;
  uid:string;
  conversationId:string
}



export interface PrivateChat{
  id: string; //conversation id
  companionID: string // conversation parter's id
}

export interface PrivateChatList{
  Count:number;
  Items:PrivateChat[] //??
}

export interface PrivateChatDTO{
  id: {S:string}; //conversation id
  companionID: {S:string} // conversation parter's id
}

export interface PrivateChatListDTO{
  Count:number;
  Items:PrivateChatDTO[] //??
}

