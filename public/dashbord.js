$(function(){

	const socketio = io();
	var roomName = 'miki';
	var user = 'miki002';
	var type = 'client';
	var data = {'roomName':roomName, 'user':user, 'type':type};
	var str = JSON.stringify(data);

	socketio.emit('enter');
	socketio.on('res_enter',function(str){
		var obj = JSON.parse(str);
//		console.log("res_init======================", obj);
		initial(obj);
	});

	var reloadID = null;
	socketio.on('info_add',function(str){

		var obj = JSON.parse(str);
		console.log("info_add======================受信", obj);

		if(!isEmpty(obj)){
			console.log("reloadID======================", reloadID);
			if(reloadID == null){
				reloadID = setTimeout(RL, 30000); //30秒後にリロード
				function RL(){
					location.reload();
					console.log("リロードしました");
				};
			}else{
				clearTimeout(reloadID); //タイマをキャンセル
				reloadID = setTimeout(RL, 30000); //30秒後にリロード
				function RL(){
					location.reload();
					console.log("リロードしました");
				};
			}

			kkk(obj); // 点滅処理
			ccc(obj); // 表示処理
			www(obj); // ログ表示

			// body点滅処理（一元的）
			$('.bd').css('animation-play-state','running');
			var timerBodyID = setTimeout(dispMsg, 10000); //10秒
			function dispMsg(){
				$('.bd').css('animation-play-state','paused');
				clearTimeout(timerBodyID);
				console.log("timerBodyクリア");
			};

		}else{
			console.log("non data");
		}
	});
	socketio.on('info_del',function(str){

		var obj = JSON.parse(str);
		console.log("info_del======================受信", obj);

		if(!isEmpty(obj)){

			ccc(obj); // 表示処理
			www(obj); // ログ表示
		}else{
			console.log("non data");
		}
	});
//	socketio.on('info_recive',function(data){
//
//		console.log("info_recive ---------", data);
//		var obj = JSON.parse(data);
//
//		var n = obj['msg'].length;
//		console.log("文字数", n)
//		if(n<=12){
//			//12文字以下なら停止
//			$('.marquee-span').css({'padding-left':'0%','animation':'marquee 0s linear infinite'});
//		}else{
//			$('.marquee-span').css({'padding-left':'100%','animation':'marquee 30s linear infinite'});
//		}
//		$('#info_recive').text(obj['msg']);
//	});

	function isEmpty(obj){
		return !Object.keys(obj).length;
	}

	function initial(obj){

		www(obj);
		ccc(obj);
	}

	// 修正(2023.3.3)
	function c6sort(zzz){
		zzz.sort(function(a,b){
		    if(a.date<b.date) return -1;
		    if(a.date > b.date) return 1;
		    return 0;
		});
		console.log("ソート関数 c6sort", zzz);
		return zzz;
	}

	function updateTimeLV(unixtime){
		var timestamp = Number(unixtime);
		var dt = new Date(timestamp);
		var update_time = getNowDateWithString(dt);
		return update_time;
	}
	function updateTimeSV(unixtime){
		var timestamp = Number(unixtime);
		var dt = new Date(timestamp);
		var update_time = getNowDateWithStringSV(dt);
		return update_time;
	}

	// 点滅
	function kkk(obj){

		console.log("KKK点滅");

		var arr = Object.entries(obj); //オブジェクトを配列に変換
		var fast_data = arr.shift(); //最初のログが最新なので最初のデータを取得

//		console.log("fast_data", fast_data);

		var new_data =  fast_data[1];

		if(new_data['category'] == "米ドル"){
			//US点滅
			$('#brink01').css('animation-play-state','running');
			var timer01 = setTimeout(dispMsg, 60000); //1分
			function dispMsg(){
				$('#brink01').css('animation-play-state','paused');
				clearTimeout(timer01);
//				console.log("timer01クリア");
			};
		}else if(new_data['category'] == "豪ドル"){
			//AUD点滅
			$('#brink02').css('animation-play-state','running');
			var timer02 = setTimeout(dispMsg, 60000); //1分
			function dispMsg(){
				$('#brink02').css('animation-play-state','paused');
				clearTimeout(timer02);
//				console.log("timer02クリア");
			};
		}else if(new_data['category'] == '外国株お知らせ'){
			//c5_info点滅
			$('#brink05').css('animation-play-state','running');
			var timer05 = setTimeout(dispMsg, 60000); //1分
			function dispMsg(){
				$('#brink05').css('animation-play-state','paused');
				clearTimeout(timer05);
//				console.log("timer05クリア");
			};
		}else if(new_data['category'] == '今週の主な予定'){
			//c6_info点滅
			$('#brink06').css('animation-play-state','running');
			var timer06 = setTimeout(dispMsg, 60000); //1分
			function dispMsg(){
				$('#brink06').css('animation-play-state','paused');
				clearTimeout(timer06);
//				console.log("timer06クリア");
			};
		}else if(new_data['category'] == '売買停止のお知らせ'){
			//c7_info点滅
			$('#brink07').css('animation-play-state','running');
			var timer07 = setTimeout(dispMsg, 60000); //1分
			function dispMsg(){
				$('#brink07').css('animation-play-state','paused');
				clearTimeout(timer07);
//				console.log("timer07クリア");
			};
		}else if(new_data['category'] == '枠増加のお知らせ'){
			//c8_info点滅
			$('#brink08').css('animation-play-state','running');
			var timer08 = setTimeout(dispMsg, 60000); //1分
			function dispMsg(){
				$('#brink08').css('animation-play-state','paused');
				clearTimeout(timer08);
//				console.log("timer08クリア");
			};
		}else if(new_data['category'] == '商品部からのお知らせ'){
			//c9_info点滅
			$('#brink09').css('animation-play-state','running');
			var timer09 = setTimeout(dispMsg, 60000); //1分
			function dispMsg(){
				$('#brink09').css('animation-play-state','paused');
				clearTimeout(timer09);
//				console.log("timer09クリア");
			};
		}
	}

	function www(obj){

//		console.log("www", obj);

		$('#logs').find('.log').remove();

		for (let key in obj) {
//			console.log(obj[key]['data01']);
			
			var val = obj[key]['data01'];
			var category = obj[key]['category']+" ";
			var timestamp = Number(obj[key]['unixtime']);
			var dt = new Date(timestamp);
			var date = getNowDateWithString(dt);

			var elm = "<li class='log'>"+ date +"："+ category + val + "</li>"
			$("#logs").append(elm);
		}
	}

	function ccc(obj){

		// 改めて全データ表示

		var isClass = $("li").hasClass('c5elm');
		if(isClass) {
		        console.log("li要素中にc5elmクラスが存在する", isClass);
			console.log("全データを一旦消去");
			// 全データ消去
			$('#c5_info').find('.c5elm').remove();
			$('#c6_info').find('.c6elm').remove();
			$('#c7_info').find('.c7elm').remove();
			$('#c8_info').find('.c8elm').remove();
			$('#c9_info').find('.c9elm').remove();
		}else{
		        console.log("li要素中にc5elmクラスは存在しない", isClass);

		}


		console.log("全データを表示");
		var us = {};
		var aud = {};
		var c6_dt = {};
		var c6_txt = {}
		var update_timeSV = "";
		var update_timeLV = "";
		var zzz = []; //追加(2023.3.3)

		var arr = Object.entries(obj);

		arr.forEach(function(element){

			var category = element[1]['category'];
//			console.log("ccc element[1]", element[1]['category']);

			if(category == "米ドル"){
				// 米ドル情報の蓄積
				us[ element[1]['unixtime'] ] = element[1]['data01'];
			}else if(category == "豪ドル"){
				// 豪ドル情報の蓄積
				aud[ element[1]['unixtime'] ] = element[1]['data01'];
			}else if(category =="外国株お知らせ"){
				// 表示
				update_timeSV = updateTimeSV(element[1]['unixtime']) + " 更新";
				var c5str = '<li class="c5elm">'+ element[1]['data01'] + '<small>（' + update_timeSV + '）</small></li>';
				$('#c5_info').append(c5str);

			}else if(category =="今週の主な予定"){
				// c6_info 更新日の蓄積
				c6_dt[ element[1]['unixtime'] ] = element[1]['data01']; // key = unixtime
				// c6_info 予定日の蓄積
				var sp = element[1]['data01'].split('*:*');
				///////////////////////////////////////////////////
				// sp[0]で[ID,予定内容]を蓄積
				//c6_txt[sp[0]] = [ element[1]['id'], sp[1] ];
				// 修正(2023.3.3)
				var tmp = {};
				tmp['date'] = sp[0];
				tmp['text'] = sp[1];
				tmp['id'] = element[1]['id'];
//				console.log("てすと", tmp);
				zzz.push(tmp);

				c6_txt[sp[0]] = [ element[1]['id'], sp[1] ];
				///////////////////////////////////////////////////

			}else if(category =="売買停止のお知らせ"){
				// c7_info 表示
				update_timeSV = updateTimeSV(element[1]['unixtime']);
				var c7str = '<li class="c7elm">'+ element[1]['data01'] + '<small>（' + update_timeSV + '）</small></li>';
				$('#c7_info').append(c7str);

			}else if(category =="枠増加のお知らせ"){
				// c8_info 表示
				update_timeSV = updateTimeSV(element[1]['unixtime']);
				var c8str = '<li class="c8elm">'+ element[1]['data01'] + '<small>（' + update_timeSV + '）</small></li>';
				$('#c8_info').append(c8str);
			}else if(category =="商品部からのお知らせ"){
				// c9_info 表示
				update_timeSV = updateTimeSV(element[1]['unixtime']);
				var c9str = '<li class="c9elm">'+ element[1]['data01'] + '<small>（' + update_timeSV + '）</small></li>';
				$('#c9_info').append(c9str);
			}
		});

		// US
		if(!isEmpty(us)){
			var us_last = Object.entries(us)[0];
			console.log("us_last", us_last);

			var us_update_time = updateTimeLV(us_last[0]) + " 更新";
			$('#usRate_update').text(us_update_time);

			var us_num = Number(us_last[1]);
//			us_str = us_num.toFixed(3); //小数点以下桁数を３桁に調整（！！返り値はString！！）修正(2023.3.3)
			us_str = us_num.toFixed(2); //小数点以下桁数を２桁に調整（！！返り値はString！！）
			$('#usRate_txt').text(us_str);
			$('#info_usRate').val(us_str); //input欄初期値設定：2023.2.28追加

			var us_buyNum = us_num + 1; //BUYとして１円加算
//			var us_buyStr = us_buyNum.toFixed(3); //小数点以下桁数を３桁に調整（！！返り値はString！！）
			var us_buyStr = us_buyNum.toFixed(2); //小数点以下桁数を２桁に調整（！！返り値はString！！）
			$('#usBUY').text(us_buyStr);

			var us_sellNum = us_num - 1; //BUYとして１円加算
//			var us_sellStr = us_sellNum.toFixed(3); //小数点以下桁数を３桁に調整（！！返り値はString！！）
			var us_sellStr = us_sellNum.toFixed(2); //小数点以下桁数を２桁に調整（！！返り値はString！！）
			$('#usSELL').text(us_sellStr);
		}

		// AUD
		if(!isEmpty(aud)){
			var aud_last = Object.entries(aud)[0];
			console.log("aud_last", aud_last);

			var aud_update_time = updateTimeLV(aud_last[0]) + " 更新";
			$('#audRate_update').text(aud_update_time);

			var aud_num = Number(aud_last[1]);
//			aud_str = aud_num.toFixed(3); //小数点以下桁数を３桁に調整（！！返り値はString！！）修正(2023.3.3)
			aud_str = aud_num.toFixed(2); //小数点以下桁数を２桁に調整（！！返り値はString！！）
			$('#audRate_txt').text(aud_str);
			$('#info_audRate').val(aud_str); //input欄初期値設定：2023.2.28追加

			var aud_buyNum = aud_num + 1; //BUYとして１円加算
//			var aud_buyStr = aud_buyNum.toFixed(3); //小数点以下桁数を３桁に調整（！！返り値はString！！）
			var aud_buyStr = aud_buyNum.toFixed(2); //小数点以下桁数を２桁に調整（！！返り値はString！！）
			$('#audBUY').text(aud_buyStr);

			var aud_sellNum = aud_num - 1; //BUYとして１円加算
//			var aud_sellStr = aud_sellNum.toFixed(3); //小数点以下桁数を３桁に調整（！！返り値はString！！）
			var aud_sellStr = aud_sellNum.toFixed(2); //小数点以下桁数を２桁に調整（！！返り値はString！！）
			$('#audSELL').text(aud_sellStr);
		}

		// c6_info 表示（***** 今週の情報のみ ****）
		// 修正(2023.3.3)
		if(!isEmpty(c6_txt)){

			////////////////////////////////////////////
			var week = StartAndEndOfThisWeek();
//			console.log("今週", week);

			var ut1 = Date.parse(week[1]);
			var ut2 = Date.parse(week[2]);
			console.log("デバック：ut1", ut1, "ut2", ut2);
			////////////////////////////////////////////
			// ソート
			var sort_c6 = c6sort(zzz);
			
//			console.log("sort_c6", sort_c6);

			// 表示
			var counter = 0;
			for (let key in sort_c6) {
				////////////////////////////////////////////
//				console.log("デバック：sort_c6[key]['date']", sort_c6[key]['date']);
				var str = week[0] + '-' + sort_c6[key]['date'];
				var rp1 = str.replace('月', '-');
				var rp2 = rp1.replace('日', '');
				console.log("デバック：日付 rp2", rp2);

				var dt = Number(Date.parse (rp2));
//				console.log("デバック：dt(ユニックスタイム)", dt);
				if(ut1<=dt && dt<=ut2){
					var c6str = '<li class="c6elm"><span class="date">'+ sort_c6[key]['date'] +"</span> "+ sort_c6[key]['text'] + '</li>';
					$('#c6_info').append(c6str);
					counter++
				}
				////////////////////////////////////////////
			}
			if(counter==0){
				var c6str = '<li class="c6elm"><span class="date">２週間以内の予定はありません</span></li>';
				$('#c6_info').append(c6str);
			}
		}

		//c6_info 最終更新日
		if(!isEmpty(c6_dt)){
			var c6_last = Object.entries(c6_dt)[0];
//			console.log("c6_last", c6_last);

			var c6_last_update = updateTimeLV(c6_last[0]) + " 最終更新";
			$('#c6_last_update').text(c6_last_update);
		}
	}

	function StartAndEndOfThisWeek(){
		var today = new Date(); //Dateをインスタンス化
		var thisYear = today.getFullYear(); //今年の年を取得
		var thisMonth = today.getMonth();　//今月を取得
		var date = today.getDate(); //今日の日にちを取得
		var dayNum = today.getDay(); //今日の曜日を取得（0～6までの数字でとれる）
		console.log("月",thisMonth, "日",date, "曜日", dayNum);

		var after14 = date +14; //今日の日に14日を加算
		var endT = new Date(thisYear, thisMonth, after14,23,59,59,999);
		console.log("今日", today);
		console.log("１４日後", endT);

		//ここからは表示したい形に整形
		var endDate = (endT.getFullYear())  + "/" + (endT.getMonth() + 1) + "/" + endT.getDate(); //土曜日の月日で文字列を作成
		var startDate = (today.getFullYear()) + "/" + (today.getMonth() + 1) + "/" + today.getDate()
		console.log("デバック：今日", startDate);
		console.log("デバック：１４日後", endDate);
		return [String(thisYear), startDate, endDate] //配列に入れて返す
	}


	function getNowDateWithString(date){
		var year_str = date.getFullYear();
		 //月だけ+1すること
		var month_str = 1 + date.getMonth();
		var day_str = date.getDate();
		var hour_str = date.getHours();
		var minute_str = date.getMinutes();
		var second_str = date.getSeconds();
		
		month_str = ('0' + month_str).slice(-2);
		day_str = ('0' + day_str).slice(-2);
		hour_str = ('0' + hour_str).slice(-2);
		minute_str = ('0' + minute_str).slice(-2);
		second_str = ('0' + second_str).slice(-2);
		 
//		format_str = 'YYYY年MM月DD日 hh:mm:ss';
		format_str = 'YYYY年MM月DD日 hh:mm';
		format_str = format_str.replace(/YYYY/g, year_str);
		format_str = format_str.replace(/MM/g, month_str);
		format_str = format_str.replace(/DD/g, day_str);
		format_str = format_str.replace(/hh/g, hour_str);
		format_str = format_str.replace(/mm/g, minute_str);
//		format_str = format_str.replace(/ss/g, second_str);
		
		return format_str;
	}
	function getNowDateWithStringSV(date){
		var year_str = date.getFullYear();
		 //月だけ+1すること
		var month_str = 1 + date.getMonth();
		var day_str = date.getDate();
		var hour_str = date.getHours();
		var minute_str = date.getMinutes();
		var second_str = date.getSeconds();
		
		month_str = ('0' + month_str).slice(-2);
		day_str = ('0' + day_str).slice(-2);
		hour_str = ('0' + hour_str).slice(-2);
		minute_str = ('0' + minute_str).slice(-2);
		second_str = ('0' + second_str).slice(-2);
		 
		format_str = 'MM月DD日 hh:mm';
		format_str = 'MM/DD hh:mm';
//		format_str = format_str.replace(/YYYY/g, year_str);
		format_str = format_str.replace(/MM/g, month_str);
		format_str = format_str.replace(/DD/g, day_str);
		format_str = format_str.replace(/hh/g, hour_str);
		format_str = format_str.replace(/mm/g, minute_str);
//		format_str = format_str.replace(/ss/g, second_str);
		
		return format_str;
	}


});
