const User = require("../Models/user");

module.exports.renderSignupForm = (req,res)=>{
  res.render("user/signup.ejs");
};


module.exports.Signup= async(req,res)=>{
  try{
  let {username, email,password}= req.body;
  const newUser = new User ({email,username});
  const registerdUser = await User.register(newUser,password);
  console.log(registerdUser);

  // req.login(registerdUser);
  req.login(registerdUser,(err)=>{
      if(err){
          return next(err);
      }
      req.flash("success","Welcome to Wanderlust!");
      res.redirect("/listings");
  });
  } catch(e){
      req.flash("error",e.message);
      res.redirect("/signup");
  }
};

module.exports.renderLoginform = (req,res)=>{
  res.render("user/login.ejs");
};

module.exports.login = async (req, res) => {
  req.flash("success", "Welcome  back to wanderlust!");
  let redirectUrl = req.session.redirectUrl || "/listings";
  res.redirect(redirectUrl);
};

module.exports.logout = (req,res,next)=>{
  req.logOut((err)=>{
      if(err){
          return next(err);
      }
      req.flash("success","you are logged out!");
      res.redirect("/listings");
  });
}