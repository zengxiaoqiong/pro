var gulp = require("gulp");
var connect = require("gulp-connect");
var sass = require("gulp-sass");
gulp.task("server",function(){
		connect.server({
			root:["./"],//指定服务器端口目录
			port:8021,
			livereload:true //是否允许自己自动刷新
			})
})


gulp.task("scss",function(){                                                                                                     
	gulp.src("src/scss/**/*").pipe(sass()).pipe(gulp.dest("src/css")).pipe(connect.reload());
})
//**复制package下的全部
gulp.task("copyPackage",function(){
	gulp.src("src/package/**/*").pipe(gulp.dest("dist/package")).pipe(connect.reload());;
})

//**复制css下的全部
gulp.task("copyCss",function(){
	gulp.src("src/css/**/*").pipe(gulp.dest("dist/css")).pipe(connect.reload());;
})
//**复制temp下的全部
gulp.task("copyTemp",function(){
	gulp.src("src/temp/**/*").pipe(gulp.dest("dist/temp")).pipe(connect.reload());;
})
//**复制index.html下的全部
gulp.task("index",function(){
	gulp.src("index.html").pipe(gulp.dest("dist")).pipe(connect.reload());;
})
//**复制js下的全部
gulp.task("copyJs",function(){
	gulp.src("src/js/**/*").pipe(gulp.dest("dist/js")).pipe(connect.reload());;
})
//**复制html下的全部
gulp.task("copyHtml",function(){
	gulp.src("src/html/**/*").pipe(gulp.dest("dist/html")).pipe(connect.reload());;
})
//**复制font下的全部
gulp.task("copyFont",function(){
	gulp.src("src/font/**/*").pipe(gulp.dest("dist/font")).pipe(connect.reload());;
})
//**复制图片下的全部
gulp.task("copyImg",function(){
	gulp.src("src/img/**/*").pipe(gulp.dest("dist/img"));
})

//自动复制到dist  
//监听
gulp.task("watch",function(){
	gulp.watch("src/index.html",["index"]);
	gulp.watch("src/js/**/*",["copyJs"]);
	gulp.watch("src/css/**/*",["copyCss"]);
	gulp.watch("src/html/**/*",["copyHtml"]);
	gulp.watch("src/img/**/*",["copyImg"]);
	gulp.watch("src/temp/**/*",["copyTemp"]);
	gulp.watch("src/scss/**/*",["scss"]);
	gulp.watch("src/package/**/*",["copyPackage"]);
})


gulp.task("default",["server","watch"],function(){
	console.log("执行完成");
})
