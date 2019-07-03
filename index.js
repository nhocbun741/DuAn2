const express = require('express')
var mysql = require('mysql')
var session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');
const {trim } = require('express-validator').validator
const { check, validationResult } = require('express-validator/check');
var multer  = require('multer')

const XLSX = require('xlsx');
const app = express()


var multipartUpload = multer({storage: multer.diskStorage({
    destination: function (req, file, callback) { callback(null, 'uploads/');},
    filename: function (req, file, callback) { callback(null, file.originalname);}})
}).single('themsv');


var conn = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "",
	database: "diemdanhsv"
});

conn.connect(function(err){
	 if (err) throw err;
  var sql = "SELECT * FROM sinh_vien";
  conn.query(sql, function(err, results) {
    if (err) throw err;
    
  })
});

app.listen(5000, () => {
   console.log('App listening on port 5000')
})



app.get('/api/sinhvien',function(req,res){
	var sql = "SELECT * FROM sinh_vien";
	conn.query(sql, function(err, results) {
    if (err) throw err;
        return res.send(results);
  });
});

app.get('/api/thongke',function(req,res){
	var sql = "SELECT * FROM diemdanh_sv";
	conn.query(sql, function(err, results) {
    if (err) throw err;
        return res.send(results);
  });
});


app.get('/api/thongkengay',function(req,res){
	var sql = "SELECT * FROM thonngke_sv where ma_mh = ma_mh and nhom_hoc = nhom_hoc and to_hoc = to_hoc";
	conn.query(sql, function(err, results) {
    if (err) throw err;
        return res.send(results);
  });
});

app.get('/api/monhoc',function(req,res){
	var sql = "SELECT * FROM mon_hoc";
	conn.query(sql, function(err, results) {
    if (err) throw err;
        return res.send(results);
  });
});

app.get('/api/sinhvien_monhoc',function(req,res){
	var sql = "SELECT * FROM sv_mh";
	conn.query(sql, function(err, results) {
    if (err) throw err;
        return res.send(results);
  });
});

app.get('/api/giangvien',function(req,res){
	var sql = "SELECT * FROM giang_vien";
	conn.query(sql, function(err, results) {
    if (err) throw err;
        return res.send(results);
  });
});


app.get('/api/sinhvien_monhoc_thongke',function(req,res){
	var sql = "SELECT sv_mh.ma_sv, sv_mh.ma_mh, sv_mh.to_hoc, sv_mh.nhom_hoc, diemdanh_sv.tinh_trang, diemdanh_sv.ngay_hoc FROM sv_mh LEFT JOIN diemdanh_sv ON sv_mh.ma_sv = diemdanh_sv.ma_sv";
	conn.query(sql, function(err, results) {
    if (err) throw err;
        return res.send(results);
  });
});


app.use(session({
	secret: 'assdasdasd123123asdz',
	resave: true,
	saveUninitialized: true
}));
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

app.get('/', function(request, response) {
	response.sendFile(path.join(__dirname + '/client/src/views/Pages/Login/Login.js'));
});
app.get('/', function(request, response) {
	response.sendFile(path.join(__dirname + '/client/src/views/QuanLy/QuanLyLopHoc/QuanLyLopHoc.js'));
});

app.post('/auth', function(request, response) {
	var username = request.body.username;
	var password = request.body.password;
	if (username && password) {
		conn.query('SELECT * FROM giang_vien WHERE ma_gv = ? AND mat_khau = ?', [username, password], function(error, results, fields) {
			if (results.length > 0) {
				request.session.username = username;
				 response.redirect('/');
			} else {
				response.send('Incorrect Username and/or Password!');
			}			
			response.end();
		});
	} else {
		response.send('Please enter Username and Password!');
		response.end();
	}
});


app.post('/suasinhvien',function(req,res){
  var masv2=req.body.masv2;
  var lopsv2=req.body.lopsv2;
  var holotsv2=req.body.holotsv2;
  var tensv2=req.body.tensv2;
  var emailsv2=req.body.emailsv2;
  var sql = "UPDATE sinh_vien SET ma_lop = '"+lopsv2+"', holot_sv = '"+holotsv2+"', ten_sv = '"+tensv2+"', email_sv = '"+emailsv2+"' WHERE ma_sv = "+masv2;
  conn.query(sql, function (err, result) {
      res.redirect("http://localhost:3000/#/quanly/quanlysinhvien");
  });
});

app.post('/xoasinhvien',function(req,res){
  var masv3=req.body.masv3;
  var sql = "DELETE FROM sinh_vien WHERE ma_sv = "+masv3;
  conn.query(sql, function (err, result) {
      res.redirect("http://localhost:3000/#/quanly/quanlysinhvien");
  });
});

app.post('/themmonhoc',function(req,res){
  var mamh=req.body.mamh;
  var tenmh=req.body.tenmh;
  var magv=req.body.magv;
  var sql = "INSERT INTO mon_hoc (ma_mh, ten_mh) VALUES ("+mamh+", '"+tenmh+"')";
  var sql2 = "INSERT INTO gv_mh (ma_gv, ma_mh) VALUES ("+magv+", "+mamh+")";
  conn.query(sql, function (err, result) {
    console.log("1 record inserted");
      
  });
  conn.query(sql2, function (err, result) {
	  console.log("1 record inserted");
	  });
	  res.redirect("http://localhost:3000/#/quanly/quanlymonhoc");
});

app.post('/suamonhoc',function(req,res){
  var mamh2=req.body.mamh2;
  var tenmh2=req.body.tenmh2;
  var sql = "UPDATE mon_hoc SET ten_mh = '"+tenmh2+"' WHERE ma_mh = "+mamh2;
  conn.query(sql, function (err, result) {
      res.redirect("http://localhost:3000/#/quanly/quanlymonhoc");
  });
});

app.post('/xoamonhoc',function(req,res){
  var mamh3=req.body.mamh3;
  
  var sql = "DELETE FROM mon_hoc WHERE ma_mh = "+mamh3;
  var sql2 = "DELETE FROM gv_mh WHERE ma_mh = "+mamh3;
  conn.query(sql, function (err, result) {
      
  });
  conn.query(sql2, function (err, result) {
      
  });
  res.redirect("http://localhost:3000/#/quanly/quanlymonhoc");
});

app.post('/themsinhvienvaomonhoc',function(req,res){
  var mamh4=req.body.mamh4;
  var manhom4=req.body.manhom4;
  var mato4=req.body.mato4;
  var masinhvien4=trim(req.body.masinhvien4);
  masinhvien4 = masinhvien4.split("\r\n");
	masinhvien4.forEach(function(element) {
	var sql = "INSERT INTO sv_mh (ma_sv, ma_mh,nhom_hoc,to_hoc) VALUES ("+element+", '"+mamh4+"', "+manhom4+","+mato4+")";
	conn.query(sql, function (err, result) {
		});
	});
	res.redirect("http://localhost:3000/#/quanly/quanlymonhoc");
});

app.post('/suasinhvienmonhoc',function(req,res){
  var mamh5=req.body.mamh5;
  var masv5=req.body.masv5;
  var manhom5=req.body.manhom5;
  var mato5=req.body.mato5;
  var sql = "UPDATE sv_mh SET nhom_hoc = "+manhom5+", to_hoc = "+mato5+" WHERE ma_mh = "+mamh5+" and ma_sv = " +masv5;
  conn.query(sql, function (err, result) {
      res.redirect("http://localhost:3000/#/quanly/quanlymonhoc");
  });
});

app.post('/xoasinhvienmonhoc',function(req,res){
  var mamh6=req.body.mamh6;
  var masv6=req.body.masv6;
  var manhom6=req.body.manhom6;
  var mato6=req.body.mato6;
  var sql = "DELETE FROM sv_mh WHERE ma_mh = "+mamh6+" and ma_sv = " +masv6+" and nhom_hoc = "+manhom6+" and to_hoc = "+mato6;
  conn.query(sql, function (err, result) {
      res.redirect("http://localhost:3000/#/quanly/quanlymonhoc");
  });
});


app.post('/themsinhvien', multipartUpload, function (req, res, next) {
	var FileName = req.file.filename;
	const workbook = XLSX.readFile('./uploads/'+FileName);
	const sheet_name_list = workbook.SheetNames;
	var objects = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
	objects.forEach(function(element) {
    var sql = "INSERT INTO sinh_vien (ma_sv, ma_lop,holot_sv,ten_sv,email_sv) VALUES ("+element.Mssv+", "+element.Lop +", '"+element.HoLot +"','"+ element.Ten+"', '"+ element.Email+"')";
	conn.query(sql, function (err, result) {
		});
	});
	 res.redirect("http://localhost:3000/#/quanly/quanlysinhvien");
});



app.get('/getInfo', function(request, response) {
	if (request.session.username) {
		 response.setHeader('Content-Type', 'application/json');
		 response.send(JSON.stringify({ a: request.session.username}));
	} else {
		 response.send(JSON.stringify({ a: 'bạn chưa đăng nhập' }));
	}
	response.send('Chua dang nhap');
});


