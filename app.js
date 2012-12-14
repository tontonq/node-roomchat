var express = require('express')
, app = express()
, socket = require('socket.io')
, crypto = require('crypto');


// <Settings>
var admins = {"admin":"pass","root":"rootpass123"};
var rooms = ["Public","Facebook","Love","18+","25+","40+","Islam","NodeJS","SocketIO","Expressjs","Private"];
var privrooms = {"Private":{}};
var onlinecounter=0; 
var maxlengtmes=400;
var privatepassword="~|~";
var bannedz={};
var colortest = /^(#)?([0-9a-fA-F]{3})([0-9a-fA-F]{3})?$/;
//var iptest = /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/;
var privkey="1jb3h65787n6mnsdjaknm2k1n4";
var nicktest=/[^a-z-0-9çışğüö_\-\:]/gi;
var the_port = process.env.PORT || 8080;
//var the_port = 8080;
// </Settings>

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.set('view options', { pretty: true });
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});


app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});


function explode(delimiter,string,limit){if(arguments.length<2||typeof delimiter=='undefined'||typeof string=='undefined')return null;if(delimiter===''||delimiter===false||delimiter===null)return false;if(typeof delimiter=='function'||typeof delimiter=='object'||typeof string=='function'||typeof string=='object'){return{0:''};}if(delimiter===true)delimiter='1';delimiter+='';string+='';var s=string.split(delimiter);if(typeof limit==='undefined')return s;if(limit===0)limit=1;if(limit>0){if(limit>=s.length)return s;return s.slice(0,limit-1).concat([s.slice(limit-1).join(delimiter)]);}if(-limit>=s.length)return[];s.splice(s.length+limit);return s;}

function encrypt(text){
  var cipher = crypto.createCipher('aes-256-cbc',privkey)
  var crypted = cipher.update(text,'utf8','hex')
  crypted += cipher.final('hex');
  return crypted;
}

function decrypt(text){
  var decipher = crypto.createDecipher('aes-256-cbc',privkey)
  var dec = decipher.update(text,'hex','utf8')
  dec += decipher.final('utf8');
  return dec;
}

app.get('/', function(req, res){
  res.render('chat',  { layout:false,title: 'Welcome to Room Chat',online:onlinecounter,odalar:rooms})
});

var server = app.listen(8080);
var io = socket.listen(server, { log: false });

console.log("Express server listening on port %d",the_port);


// We store users
var users = {};
var tinyusers = {};

// For heroku support
io.configure(function () { 
  io.set("transports", ["xhr-polling"]); 
  io.set("polling duration", 10); 
});


io.sockets.on('connection', function(socket){


  

    // We add users to memory
    socket.on("addUser", function(userName,oda){



    if((userName.search(/[a-z]/i) === -1) || (userName.length<3))  {

    userName="unnamed"+Math.floor(Math.random() * 9999999);

    }

        
		if(!rooms[oda]){oda=0;}
        girisyap = 1;
		ipz=socket.handshake.headers['x-forwarded-for'] || socket.handshake.address.address;
      if (privrooms[rooms[oda]]) {

        if (userName.indexOf(privatepassword)>-1) {

          userName=userName.replace(privatepassword, "");
          girisyap=1;

        }else {
          socket.emit("uyari", "You are not allowed to access this room");
          girisyap=0;
          socket.emit("kopgit");
        }
      }


        if(admins[userName])
        {
          socket.emit("uyari", "This nick is owner by Administrators.");
          girisyap=0;
		  socket.emit("kopgit");
        }
				
        if(userName.indexOf(':')>-1)
        {
          datauser=explode(':',userName,2);
          userName=datauser[0];
          password=datauser[1];
          if(admins[userName]!=password) 
          { 
           socket.emit("uyari", "Wrong Password.");
           girisyap=0;
		   socket.emit("kopgit");
          } 
          else if(users[userName])
          { 
            socket.emit("uyari", "Admin is already logged on.");
            girisyap=0;
			socket.emit("kopgit");
          }

          else
          {
            girisyap=1;
          }
        }
		userName = userName.replace(nicktest, "");
        socket.userName = userName;
        socket.userId = Object.keys(users).length;
		socket.room=oda;
        
      if(bannedz[ipz])
      {
        socket.emit("uzaklas","");
        girisyap = 0;
      }

		if(!tinyusers[userName.toLowerCase()] && girisyap)
        {
		tinyusers[userName.toLowerCase()] = {nick:userName.toLowerCase(),ip:encrypt(ipz)};
        // We add users to our array
        users[userName] = {
            userName : userName,
            userId : Object.keys(users).length,
            room : oda,
            socketid : encrypt(socket.id)
        };
		
		socket.join(oda);
		

        socket.emit("sendMessage", "System","Welcome to "+ rooms[oda] + " Room.",'000000',0);


        socket.broadcast.to(oda).emit("sendMessage", "<font color='#006400'>System</font>", userName + " connected to chat. (y)",'000000',0);

		io.sockets.in(oda).emit("kullanicilariYenile", users,io.sockets.clients(oda).length);
		onlinecounter=Object.keys(users).length;
        socket.emit("girisyap", "");
      }
      else
      {
        if(girisyap)
        {
        socket.emit("uyari", "This nick you entered  has already been used.");
		socket.emit("kopgit");
        }
      }
    });

    
    socket.on("disconnect", function(){
		try {
		if(socket.id==decrypt(users[socket.userName]["socketid"]))
		{
    delete users[socket.userName];
		delete tinyusers[socket.userName.toLowerCase()];
		socket.leave(socket.room);
		io.sockets.in(socket.room).emit("kullanicilariYenile", users,io.sockets.clients(socket.room).length);
		onlinecounter=Object.keys(users).length;
        if(socket.userName)
        {
        socket.broadcast.to(socket.room).emit("sendMessage", "<font color='#b22222'>System</font>", socket.userName + " disconnected (n)",'000000',0);
        }
		}
		} catch(e){}
    });


    socket.on("sentMessage", function(data,color){
		if(!colortest.test(color)){color='000000';}
        if(data.length>maxlengtmes || data.length <1)
        {
          socket.emit("uyari", "Message can't be logned than 400 and empty!");
        }
        else
        {
		//private message
        if(data.indexOf(':')>-1)
        {
          veri=explode(':',data,2);
          if(users[veri[0]])
          {
            whom=veri[0];
            message=veri[1];
            io.sockets.socket(decrypt(users[whom].socketid)).emit("sendMessage",[socket.userName,whom],message,color,1,1);
			io.sockets.socket(socket.id).emit("sendMessage",[socket.userName,whom],message,color,1,0);
          }


        else
        { 
		  if(admins[socket.userName]) {
          io.sockets.in(socket.room).emit("sendMessage", socket.userName, data,color,0,1);
		  }
		  else
		  {
		  io.sockets.in(socket.room).emit("sendMessage", socket.userName, data,color,0,0);
		  }
        }

        }


        else if(data.indexOf('/kick ')=='0' && admins[socket.userName])
          {
            who=data.split('/kick ')[1];
            if(users[who] && !admins[who])
            {
           socket.broadcast.to(socket.room).emit("sendMessage", "System", who + " banned (n)",'000000',0,0);
           io.sockets.socket(decrypt(users[who].socketid)).emit("uzaklas","");
           delete users[who];
		   delete tinyusers[who.toLowerCase()];
		   io.sockets.in(socket.room).emit("kullanicilariYenile", users,io.sockets.clients(socket.room).length);
		   onlinecounter=Object.keys(users).length;
          }
		  else
		  {
		 io.sockets.socket(decrypt(users[who].socketid)).emit("sendMessage",["System",who],socket.userName+" tried to kick you",color,1,0);
		  }
		  
		  
        }
		
	else if(data.indexOf('/adminkick ')=='0' && admins[socket.userName])
          {
            kim=data.split('/adminkick ')[1];
            if(users[kim] && kim!="root")
            {
           socket.broadcast.to(socket.room).emit("sendMessage", "System", kim + " banned (n)",'000000',0,0);
           io.sockets.socket(decrypt(users[kim].socketid)).emit("uzaklas","");
           delete users[kim];
		   delete tinyusers[kim.toLowerCase()];
		   io.sockets.in(socket.room).emit("kullanicilariYenile", users,io.sockets.clients(socket.room).length);
		   onlinecounter=Object.keys(users).length;
          }
        }
		
		

        else if(data.indexOf('/ban ')=='0' && admins[socket.userName])
          {
            who=data.split('/ban ')[1];
            if(users[who] && !admins[who])
            {
            bannedz[decrypt(tinyusers[who.toLowerCase()].ip)]={"ip" : decrypt(tinyusers[who.toLowerCase()].ip)};
           socket.emit("sendMessage","System", who+" ip : "+decrypt(tinyusers[who.toLowerCase()].ip),'000000',0,0);
           socket.broadcast.to(socket.room).emit("sendMessage", "System", who + " banned (n)",'000000',0,0);
           io.sockets.socket(decrypt(users[who].socketid)).emit("uzaklas","");
           delete users[who];
		   delete tinyusers[who.toLowerCase()];
           io.sockets.in(socket.room).emit("kullanicilariYenile", users,io.sockets.clients(socket.room).length);
           onlinecounter=Object.keys(users).length;          
          }
        }
	
		 

          else if(data.indexOf('/unban ')=='0' && admins[socket.userName])
          {
            kim=data.split('/unban ')[1];
            if(bannedz[kim])
            {
           delete bannedz[kim];
           socket.emit("sendMessage","System", "You have removed restriction of " +kim,'000000',0,0);
          }
        }
        else	
        {
		if(admins[socket.userName]) {
          io.sockets.in(socket.room).emit("sendMessage", socket.userName, data,color,0,1);
		  }
		  else
		  {
		  io.sockets.in(socket.room).emit("sendMessage", socket.userName, data,color,0,0);
		  }
        }
        }
    });
});