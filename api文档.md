# 接口文档

## 目录：
[1、注册](#1注册)<br/>
[2、登陆](#2登陆)<br/>
[3、更新用户信息](#3更新用户信息)<br/>
[4、获取当前的user(根据cookie)](#4获取当前的user(根据cookie))<br/>
[5、获取用户列表](#5获取用户列表)<br/>
[6、获取当前用户的聊天消息列表](#6获取当前用户的聊天消息列表)<br/>
[7、 修改指定消息为已读](#7修改指定消息为已读)<br/>


## 1、注册

### 请求URL：
	localhost:3000/register

### 请求方式：
	POST

### 参数类型

	|参数		|是否必选 |类型     |说明
	|username    |Y       |string   |用户名
	|userPW      |Y       |string   |密码
	|userType   |Y       |string    | Boss or Candidate

### 返回示例：
	成功:
	    {
	      "code": 0,
	      "data": {
	        "_id": user._id "5ae133e621388d262c8d91a6" ,
	        "username": "ds2",
	        "userType": "Boss" "Candidate"
	      }
	    }
	失败
	    {
	      "code": 1,
	      "msg": "username exists"
	    }

可能的 state 变化
userData: {
    username:""  // info after login   String
    userType:""  // info after login  String Boss or Candidate
    errMsg:""  // error message
    redirectUrl: ""  // after login, set a url; when not null, to another page
   }

if error
userData: {
    username:""  // info after login   String
    userType:""  // info after login  String Boss or Candidate
    errMsg:"username exists"  // error message
    redirectUrl: ""  // after login, set a url; when not null, to another page
   }

if right
userData: {
    username:"username"  // info after login   String
    userType:"Boss" : "Candidate"  // info after login  String Boss or Candidate
    errMsg: ""  // error message
    redirectUrl: "/"  // after login, set a url; when not null, to another page
   }
## 2、登陆

### 请求URL：
	localhost:3000/login

### 请求方式：
	POST

### 参数类型

	|参数		|是否必选 |类型     |说明
	|username    |Y       |string   |用户名
	|userPW      |Y       |string   |密码

### 返回示例：
	成功:
	    {
	      "code": 0,
	      "data": {
	        "_id": "5ae1338a21388d262c8d91a5",
	        "username": "ds1",
	        "userType": "Boss" "Candidate"
	        // "__v": 0   //在实际中已经 filter 掉

			可能部分: 填写头像则有
    		"headPhoto": "aaa"
			可能部分: 非强制
			"description": "Superman ",
   			"position": "web dev",    		

			可能部分: Boss才有的条目
			"salary": "€11000",
			"company": "212",   
	      }

	    }
	失败
	    {
	      "code": 1,
	      "msg": "用户名或密码错误"
	    }

	可能的state：
	成功时： userData: {
				username: 'aaa',
				userType: 'Boss',
				errMsg: '',
				redirectUrl: '/'
				
			可能部分: 填写头像则有
    		"headPhoto": "aaa"
			可能部分: 非强制
			"description": "Superman ",
   			"position": "web dev",    		

			可能部分: Boss才有的条目
			"salary": "€11000",
			"company": "212",   
			}
	 失败时：userData: {
				errMsg: "username doesn't exist"  // error message				
						"wrong password"  // error message				
   			}

## 3、更新用户信息

### 请求URL：
	localhost:3000/updateUserInfo

### 请求方式：
	POST

### 参数类型：

	|参数		|是否必选 |类型     |说明
	|headPhoto  |Y       |string   |头像名称
	|description  |N       |string   |介绍
	|position     |N       |string   |职位
	|salary    |N       |string   |月薪
	|company   |N       |string   |公司

### 返回示例：
	成功:
	    {
		    "code": 0,
		    "data": {
				"_id": "5ae1338a21388d262c8d91a5",
				"username": "ds1",
				"userType": "Boss" "Candidate"


				可能部分: 填写头像则有
				"headPhoto": "aaa"
				可能部分: 非强制
				"description": "Superman ",
				"position": "web dev",    		

				可能部分: Boss才有的条目
				"salary": "€11000",
				"company": "212",   
		    }
		}
	失败
	    {
	      "code": 1,
	      "msg": "Please Log In"
	    }
   
   可能的state
   	userData: {
		username: 'ccc',
		_id: '6081a9b95db5c846fc0527e2',
		headPhoto: 'header1',
		position: '11',
		description: '反反复复反反复复反反复复反反复复反反复复',
		userType: 'Candidate'

		redirectUrl: '/home'

	}
	失败时
	userData: {
		errMsg:"Please Log In"// error message				
	}
## 4、获取当前的user(根据cookie)

### 请求URL：
	localhost:3000/user

### 请求方式：
	GET

### 参数类型

	无

### 返回示例：
类似于 update
	成功:
	    {
		    "code": 0,
		    "data": {
				"_id": "5ae1338a21388d262c8d91a5",
				"username": "ds1",
				"userType": "Boss" "Candidate"


				可能部分: 填写头像则有
				"headPhoto": "aaa"
				可能部分: 非强制
				"description": "Superman ",
				"position": "web dev",    		

				可能部分: Boss才有的条目
				"salary": "€11000",
				"company": "212",   
		    }
		}

	失败
	    {
	      "code": 1,
	      "msg": "请先登陆"
	    }
类似于login

## 5、获取用户列表

### 请求URL：
	localhost:3000/userlist?userType="Boss"

### 请求方式：
	GET

### 参数类型: query

	|参数		|是否必选 |类型     |说明
	|userType   |Y       |string   |类型("Boss" "Candidate"

### 返回示例：
	{
	    "code": 0,
	    "data": [
	        {
	            "_id": "5ae1d5d19151153d30e008fd",
	            "username": "ds2",
	            "userType": "dashen",
				"headPhoto": "header1"

	        },
	        {
	            "_id": "5ae1ddd99ca58023d82351ae",
	            "username": "aa",
	            "userType": "dashen",
	        
	            "position": "前端工程师",
	            "description": "Rect/Vue",
	            "salary": 
				"company":
	        }
	    ]
	}
	

## 6、获取当前用户的聊天消息列表

### 请求URL：
	localhost:3000/msglist

### 请求方式：
	GET

### 参数类型
	无

### 返回示例：
	{
	    "code": 0,
	    "data": {
	        "users": {
	            "5ae1d5d19151153d30e008fd": {
	                "username": "ds2"
	            },
	            "5ae1ddd99ca58023d82351ae": {
	                "username": "aa",
	                "headPhoto": "头像1"
	            },
	            "5ae1df049ca58023d82351af": {
	                "username": "aa2"
	            },
	            "5ae1e72aa072c522e024b18e": {
	                "username": "bb",
	                "headPhoto": "头像3"
	            },
	            "5ae1f088d37a442b749fc143": {
	                "username": "laoban1",
	                "headPhoto": "头像2"
	            }
	        },
	        "chatMsgs": [
				{
	                "read": false,
	                "_id": "5ae1f3c3a95eb824841199f1",
	                "from": "5ae1f088d37a442b749fc143",
	                "to": "5ae1ddd99ca58023d82351ae",
	                "content": "aa",
	                "created_time": 1524757443374,
	                "__v": 0
	            }
			]
	    }
	}
### 数据库结构
const chatSchema = mongoose.Schema({
  from: {type:String, required: true},
  to: {type:String, required: true},
  chat_id: {type:String, required: true},
  content: {type:String, required: true},
  isRead: {type:Boolean, default: false},
  created_time: {type:Number}
})

## 7、 修改指定消息为已读
### 请求URL：
	localhost:3000/readmsg

### 请求方式：
	post

### 参数类型
	|参数		|是否必选 |类型     |说明
	|from       |Y       |string   |发送消息用户的id
### 返回示例：
	{code: 0, data: 2}