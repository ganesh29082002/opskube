export const config = {
    local : {
       db:{
               HOST:  process.env.DATABASE_HOST,
               PORT:  process.env.DATABASE_PORT,
               DATABASE:  process.env.DATABASE_NAME,
               USERNAME: "",
               PASSWORD:  "",
          },
       apiPort :process.env.PORT || 5090
    },
    staging : {
       db:{
   
          },
       apiPort :process.env.PORT
    },
    production:{
       db:{
   
       },
       apiPort:process.env.PORT 
    }
   }
   
   