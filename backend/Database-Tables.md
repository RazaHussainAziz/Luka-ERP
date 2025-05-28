## PostgreSQL Database Tables Documentation

This file contains the table schema's for **postgreSQL** database for **LUKA**

> ## **<font color="white">USER TABLE</font>**

This table stores the data of admin.

```SQL
  CREATE TABLE IF NOT EXISTS public.users
  (
    id serial NOT NULL,
    username character varying(30) NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    pro boolean NOT NULL DEFAULT false,
    created_at timestamp without time zone NOT NULL,
    PRIMARY KEY (id)
);
```

> ## **<font color="white">EMPLOYEE TABLE</font>**

This table stores the data of employees added by the admin in system.

```SQL
CREATE TABLE IF NOT EXISTS public.employee
(
    id serial NOT NULL,
    username character varying(30) NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    admin_id integer NOT NULL,
    PRIMARY KEY (id)
);
```

> ## **<font color="white">INVENTORY TABLE</font>**

This table stores the data of items added to inventory.

```SQL
  CREATE TABLE IF NOT EXISTS public.inventory
(
    id serial NOT NULL,
    product text NOT NULL,
    sku_code text NOT NULL,
    category text NOT NULL,
    brand text NOT NULL,
    cost_price numeric(10, 2) NOT NULL,
    sell_price numeric(10, 2) NOT NULL,
    quantity integer NOT NULL,
    min_stock integer NOT NULL,
    created_at timestamp without time zone NOT NULL,
    admin_id integer NOT NULL,
    PRIMARY KEY (id)
);
```

> ## **<font color="white">Relationships Table</font>**

Following table shows the relationships between tables.

| Table     | PK  | FK       | Related-Table | Relation    |
| --------- | --- | -------- | ------------- | ----------- |
| Users     | id  | -        | Employee      | One-to-Many |
| Users     | id  | -        | Inventory     | One-to-Many |
| Employee  | id  | admin_id | Users         | Many-to-One |
| Inventory | id  | admin_id | Users         | Many-to-One |
