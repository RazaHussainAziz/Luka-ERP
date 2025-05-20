  type User = {
    id:string,
    username:string,
    email:string,
    isPro:boolean,
    authFlag:boolean
  }


  type userStore = {
     user: User | null,
     writeUser:(user:User)=>void,
     clearUser:()=>void
  }

  export type {
    User,
    userStore
  }