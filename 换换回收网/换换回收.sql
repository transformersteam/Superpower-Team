/*==============================================================*/
/* DBMS name:      Microsoft SQL Server 2012                    */
/* Created on:     2019/7/2 16:46:50                            */
/*==============================================================*/
create database BullRecycle

use BullRecycle

select * from Account

if exists (select 1
            from  sysobjects
           where  id = object_id('Account')
            and   type = 'U')
   drop table Account
go

if exists (select 1
            from  sysobjects
           where  id = object_id('AccountDetail')
            and   type = 'U')
   drop table AccountDetail
go

if exists (select 1
            from  sysobjects
           where  id = object_id('Alipay')
            and   type = 'U')
   drop table Alipay
go

if exists (select 1
            from  sysobjects
           where  id = object_id('AuditActivity')
            and   type = 'U')
   drop table AuditActivity
go

if exists (select 1
            from  sysobjects
           where  id = object_id('AuditConfiguration')
            and   type = 'U')
   drop table AuditConfiguration
go

if exists (select 1
            from  sysobjects
           where  id = object_id('AuditHistory')
            and   type = 'U')
   drop table AuditHistory
go

if exists (select 1
            from  sysobjects
           where  id = object_id('AuditNode')
            and   type = 'U')
   drop table AuditNode
go

if exists (select 1
            from  sysobjects
           where  id = object_id('BankCard')
            and   type = 'U')
   drop table BankCard
go

if exists (select 1
            from  sysobjects
           where  id = object_id('Goods')
            and   type = 'U')
   drop table Goods
go

if exists (select 1
            from  sysobjects
           where  id = object_id('GoodsCondition')
            and   type = 'U')
   drop table GoodsCondition
go

if exists (select 1
            from  sysobjects
           where  id = object_id('GoodsType')
            and   type = 'U')
   drop table GoodsType
go

if exists (select 1
            from  sysobjects
           where  id = object_id('OrderState')
            and   type = 'U')
   drop table OrderState
go

if exists (select 1
            from  sysobjects
           where  id = object_id('Orders')
            and   type = 'U')
   drop table Orders
go

if exists (select 1
            from  sysobjects
           where  id = object_id('PowerRole')
            and   type = 'U')
   drop table PowerRole
go

if exists (select 1
            from  sysobjects
           where  id = object_id('Powers')
            and   type = 'U')
   drop table Powers
go

if exists (select 1
            from  sysobjects
           where  id = object_id('RecycleCar')
            and   type = 'U')
   drop table RecycleCar
go

if exists (select 1
            from  sysobjects
           where  id = object_id('RecycleType')
            and   type = 'U')
   drop table RecycleType
go

if exists (select 1
            from  sysobjects
           where  id = object_id('Roles')
            and   type = 'U')
   drop table Roles
go

if exists (select 1
            from  sysobjects
           where  id = object_id('UserRole')
            and   type = 'U')
   drop table UserRole
go

if exists (select 1
            from  sysobjects
           where  id = object_id('Users')
            and   type = 'U')
   drop table Users
go

if exists (select 1
            from  sysobjects
           where  id = object_id('WeChat')
            and   type = 'U')
   drop table WeChat
go

/*==============================================================*/
/* Table: Account                                               */
/*==============================================================*/
create table Account (
   Id                   int                  identity,
   AvailableBalance     decimal(11,2)        null,
   WaitConfirmBalance   decimal(11,2)        null,
   CreateTime           datetime             null,
   constraint PK_ACCOUNT primary key (Id)
)
go

/*==============================================================*/
/* Table: AccountDetail                                         */
/*==============================================================*/
create table AccountDetail (
   Id                   int                  identity,
   DealTime             datetime             null,
   OrderNumber          nvarchar(50)         null,
   FundFlowId           int                  null,
   TakeMoney            decimal(11,2)        null,
   constraint PK_ACCOUNTDETAIL primary key (Id)
)
go

/*==============================================================*/
/* Table: Alipay                                                */
/*==============================================================*/
create table Alipay (
   Id                   int                  identity,
   AlipayNumber         nvarchar(50)         null,
   UserId               int                  null,
   CreateTime           datetime             null,
   constraint PK_ALIPAY primary key (Id)
)
go

/*==============================================================*/
/* Table: AuditActivity                                         */
/*==============================================================*/
create table AuditActivity (
   Id                   int                  identity,
   GoodsId              int                  null,
   ConfigurationId      int                  null,
   CreateTime           datetime             null,
   AuditStateId         int                  null,
   IsPass               int                  null,
   constraint PK_AUDITACTIVITY primary key (Id)
)
go

/*==============================================================*/
/* Table: AuditConfiguration                                    */
/*==============================================================*/
create table AuditConfiguration (
   Id                   int                  identity,
   NodeId               int                  null,
   NextId               int                  null,
   CreateTime           datetime             null,
   constraint PK_AUDITCONFIGURATION primary key (Id)
)
go

/*==============================================================*/
/* Table: AuditHistory                                          */
/*==============================================================*/
create table AuditHistory (
   Id                   int                  identity,
   ActivityId           int                  null,
   CreateTime           datetime             null,
   constraint PK_AUDITHISTORY primary key (Id)
)
go

/*==============================================================*/
/* Table: AuditNode                                             */
/*==============================================================*/
create table AuditNode (
   Id                   int                  identity,
   NodeName             nvarchar(50)         null,
   IsState              int                  null,
   CreateTime           datetime             null,
   constraint PK_AUDITNODE primary key (Id)
)
go

/*==============================================================*/
/* Table: BankCard                                              */
/*==============================================================*/
create table BankCard (
   Id                   int                  identity,
   BankNumber           nvarchar(50)         null,
   BelongBank           nvarchar(50)         null,
   UserId               int                  null,
   CreateTime           datetime             null,
   constraint PK_BANKCARD primary key (Id)
)
go

/*==============================================================*/
/* Table: Goods                                                 */
/*==============================================================*/
create table Goods (
   Id                   int                  identity,
   GoodsName            nvarchar(50)         null,
   GoodsTypeId          int                  null,
   IsState              int                  null,
   CreateTime           datetime             null,
   constraint PK_GOODS primary key (Id)
)
go

/*==============================================================*/
/* Table: GoodsCondition                                        */
/*==============================================================*/
create table GoodsCondition (
   Id                   int                  identity,
   ConditionName        nvarchar(50)         null,
   ParentId             int                  null,
   IsState              int                  null,
   CreateTime           datetime             null,
   constraint PK_GOODSCONDITION primary key (Id)
)
go

/*==============================================================*/
/* Table: GoodsType                                             */
/*==============================================================*/
create table GoodsType (
   Id                   int                  identity,
   GoodsTypeId          nvarchar(50)         null,
   RecycleTypeId        int                  null,
   IsState              int                  null,
   CreateTime           datetime             null,
   constraint PK_GOODSTYPE primary key (Id)
)
go

/*==============================================================*/
/* Table: OrderState                                            */
/*==============================================================*/
create table OrderState (
   Id                   int                  identity,
   OrderStateName       nvarchar(50)         null,
   IsState              int                  null,
   CreateTime           datetime             null,
   constraint PK_ORDERSTATE primary key (Id)
)
go

/*==============================================================*/
/* Table: Orders                                                */
/*==============================================================*/
create table Orders (
   Id                   int                  identity,
   GoodsId              int                  null,
   OrderMoney           decimal(11,2)        null,
   StateId              int                  null,
   CreateTime           datetime             null,
   constraint PK_ORDERS primary key (Id)
)
go

/*==============================================================*/
/* Table: PowerRole                                             */
/*==============================================================*/
create table PowerRole (
   Id                   int                  identity,
   PowerId              int                  null,
   RoleId               int                  null,
   constraint PK_POWERROLE primary key (Id)
)
go

/*==============================================================*/
/* Table: Powers                                                */
/*==============================================================*/
create table Powers (
   Id                   int                  identity,
   PowerName            nvarchar(50)         null,
   ParentId             int                  null,
   BelongRole           nvarchar(100)        null,
   IsState              int                  null,
   CreateTime           datetime             null,
   constraint PK_POWERS primary key (Id)
)
go

/*==============================================================*/
/* Table: RecycleCar                                            */
/*==============================================================*/
create table RecycleCar (
   Id                   int                  identity,
   GoodsId              int                  null,
   GoodsConditionId     int                  null,
   UserId               int                  null,
   CreateTime           datetime             null,
   constraint PK_RECYCLECAR primary key (Id)
)
go

/*==============================================================*/
/* Table: RecycleType                                           */
/*==============================================================*/
create table RecycleType (
   Id                   int                  identity,
   RecycleTypeName      nvarchar(50)         null,
   IsState              int                  null,
   CreateTime           datetime             null,
   constraint PK_RECYCLETYPE primary key (Id)
)
go

/*==============================================================*/
/* Table: Roles                                                 */
/*==============================================================*/
create table Roles (
   Id                   int                  identity,
   RoleName             nvarchar(50)         null,
   BelongUser           nvarchar(100)        null,
   IsState              int                  null,
   CreateTime           datetime             null,
   constraint PK_ROLES primary key (Id)
)
go

/*==============================================================*/
/* Table: UserRole                                              */
/*==============================================================*/
create table UserRole (
   Id                   int                  identity,
   UserId               int                  null,
   RoleId               int                  null,
   constraint PK_USERROLE primary key (Id)
)
go

/*==============================================================*/
/* Table: Users                                                 */
/*==============================================================*/
create table Users (
   Id                   int                  identity,
   UserName             nvarchar(50)         null,
   UserPassword         nvarchar(50)         null,
   UserRealName         nvarchar(50)         null,
   UserTypeId           int                  null,
   IsState              int                  null,
   CreateTime           datetime             null,
   constraint PK_USERS primary key (Id)
)
go

/*==============================================================*/
/* Table: WeChat                                                */
/*==============================================================*/
create table WeChat (
   Id                   int                  identity,
   WeChatNumber         nvarchar(50)         null,
   UserId               int                  null,
   CreateTime           datetime             null,
   constraint PK_WECHAT primary key (Id)
)
go

