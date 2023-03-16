const port = 55555;

// -- create the socket server on the port ---

const express = require('express');
const app = express();
//const basicAuth = require('express-basic-auth');
//app.use(basicAuth({
//	users: { 'bell': 'mark2022sein' },
//	challenge: true,
//	realm: 'foo',
//}));
const path = require('path');
const favicon = require('serve-favicon');

app.use(express.static(path.join(__dirname, './public')));
app.use(favicon(__dirname + '/public/images/fav01.ico'));

const fs = require('fs');
const options = {
	key: fs.readFileSync('/etc/letsencrypt/live/area18.cf/privkey.pem'),
	cert: fs.readFileSync('/etc/letsencrypt/live/area18.cf/fullchain.pem'),
}
const https = require('https');
const server = https.createServer(options, app)



const mysql = require('mysql');
var connection = mysql.createConnection({
	host: '127.0.0.1',
	user: 'azarashi',
	password: 'gomagoma1239',
	database: 'bi'
});


///////////////////////////////////
var memberTableOrgn = {};
var memberTable = {};
memberTable['miki'] = [];
///////////////////////////////////

const io = require('socket.io')(server)
console.log('BI started on port:' + port);


io.on('connection', function(socket) {

	socket.on('enter', function() {
		var sql = 'SELECT * FROM tb1 ORDER BY unixtime DESC LIMIT 50';
		connection.query(sql, function (err, result) {
			if(err){
				console.log('[select ERROR] - ',err.message);
				return;
		   	}
			var obj = Object.assign({}, result);
			var str = JSON.stringify(obj);

			io.to(socket.id).emit('res_enter', str); //ここだけ限定送信
		});
	});
	socket.on('new_info',function(data){

		console.log("new_info 受信", data);
		var obj = JSON.parse(data);

		// DB記録
		var data01 = obj['msg'];
		var category = obj['category'];
		var unixtime = Date.now();
		var sql = 'INSERT INTO tb1(id, data01, category, unixtime) VALUES(0,?,?,?)';
		var sqlParams = [data01, category, unixtime];
		console.log(sqlParams);

		var query = connection.query(sql, sqlParams, function (err, result) {
			if(err){
				console.log('[insert ERROR] - ',err.message);
				return;
		   	}
			//全データ送信
			var sql2 = 'SELECT * FROM tb1 ORDER BY unixtime DESC LIMIT 50';
			connection.query(sql2, function (err, result2) {
				if(err){
					console.log('[select ERROR] - ',err.message);
					return;
			   	}
				var obj = Object.assign({}, result2);
				var str = JSON.stringify(obj);
				io.emit('info_add', str); //ここは一斉送信
			});
		});
		// オドテーブル保存
		var sqlBK = 'INSERT INTO tb1BK(id, data01, category, unixtime) VALUES(0,?,?,?)';
		var queryBK = connection.query(sqlBK, sqlParams, function (err, result) {
			if(err){
				console.log('[insert ERROR] - ',err.message);
				return;
		   	}
		});
	});


	socket.on('req_del',function(id) {

		var modSql = 'DELETE FROM tb1 WHERE id=?';
		var target_id = Number(id);
		var modSqlParams = [target_id];
		connection.query(modSql, modSqlParams, function (err, result) {

			console.log('req_del データ削除', target_id);
			if(err){
				console.log('[delete ERROR] - ',err.message);
				return;
		   	}
			//全データ送信
			var sql2 = 'SELECT * FROM tb1 ORDER BY unixtime DESC LIMIT 50';
			connection.query(sql2, function (err, result2) {
				if(err){
					console.log('[select ERROR] - ',err.message);
					return;
			   	}
				var obj = Object.assign({}, result2);
				var str = JSON.stringify(obj);
				io.emit('info_del', str); //ここは一斉送信
			});
		});
		// 削除時間の追加アップデート
		var unixtime = Date.now();

		modSql2 = 'UPDATE tb1BK SET del = ? WHERE id = ?';
		modSqlParams2 = [unixtime, target_id ];
		connection.query(modSql2, modSqlParams2, function (err, res) {
			console.log('req_del 削除時間アップデート', target_id);
			if(err){
				console.log('[update ERROR] - ',err.message);
				return;
		   	}
		});
	});

});
server.listen(port)

