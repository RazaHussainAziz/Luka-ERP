# Luka - Api Documentation

This document contains the api **routes** and **responses** for the **Inventory**\.

> ### ***api/v1/inventory*** :

#### **Method : POST**
1. Body Parsing Error :
```json
   {
      "code":400,
      "success":false,
      "error":""
   }
```

2. Database Insertion Failed :
 ```json
    {
      "code":500,
      "success":false,
      "error":""
    }
 ```

2. Insertion Successfull :
 ```json
    {
      "code":201,
      "success":true,
      "message":"Insertion Successfull"
    }
 ```
