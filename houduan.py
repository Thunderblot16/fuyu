from flask import Flask, request, jsonify, url_for, make_response
from flask_cors import CORS, cross_origin
from flask_sqlalchemy import SQLAlchemy
import pymysql
import json
from nose import tools
from werkzeug.utils import redirect

app=Flask(__name__)
#解决跨域问题
cors = CORS(app, resources={r"/api/*": {"origins": "*"}})
# 连接
conn = pymysql.connect(host='127.0.0.1', user='root', password='', db='04zu', charset='utf8')
# 创建游标
cursor = conn.cursor()
#登录验证
@app.route('/login/<string:id>/<string:pwd>',methods=['get','post'])
@cross_origin()
def login(id,pwd):
    try:

        #执行sql语句

        sql = 'select * from user where id = "%s" and pwd="%s"' % (id, pwd)
        res = cursor.execute(sql)
        print(res)
    finally:
        cursor.close()
        # 进行判断
        if res:
            print('登录成功')
        else:
            print('用户名或密码错误')
    return jsonify({"code":0})

#注册
@app.route('/zhuce/<string:id>/<string:pwd1>/<string:mail>',methods=['get','post'])
@cross_origin()
def zhuche(id,pwd1,mail):
    # 创建游标
    cursor = conn.cursor()
    try:
        # password = input('password>>>: ')
        # id = input('id>>>: ')
        sql = "insert into user value('%s','%s','%s')" % (id,pwd1,mail)
        cursor.execute(sql)
        conn.commit()
        print('123')
        # print(result)
    finally:
        cursor.close()
        # 进行判断
        # if result:
        #     print('注册成功')
        # else:
        #     print('错误')
    return jsonify({"code":0})

#修改密码
@app.route('/add/<string:pwd>',methods=['get','post'])
@cross_origin()
def xiugai(pwd):
    # 创建游标
    cursor = conn.cursor()
    try:
        # password = input('password>>>: ')
        # id = input('id>>>: ')


        sql = "update user set pwd = '%s' where id =610" % (pwd)
        res = cursor.execute(sql)
        print(res)
    finally:
        cursor.close()
        conn.close()
        # 进行判断
        if res:
            print('修改成功')
        else:
            print('密码错误')
    return jsonify({"code":0})





if __name__=='__main__':
    app.run(debug=True)
