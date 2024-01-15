import 'package:bit_go/constants/Rouets.dart';
import 'package:bit_go/constants/global_variable.dart';
import 'package:bit_go/screen/AuthScreen/Forget.dart';
import 'package:bit_go/screen/AuthScreen/Register.dart';
import 'package:bit_go/screen/home.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';

class LoginScreen extends StatefulWidget {
  const LoginScreen({super.key});

  @override
  State<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  TextEditingController useremailController = TextEditingController();
  TextEditingController passwordController = TextEditingController();
   bool isPassword = true;
   bool loading = false;
  final _auth = FirebaseAuth.instance;

  @override
  Widget build(BuildContext context) {
    return  Container(
      decoration: const BoxDecoration(
          gradient: LinearGradient(
            begin: Alignment.topRight,
            end: Alignment.bottomLeft,
            colors: [
              Color.fromARGB(255, 255, 255, 255),
              Color.fromARGB(255, 113, 113, 225),
              Color.fromARGB(213, 86, 35, 35),
              Color.fromARGB(128, 68, 59, 59),


            ],
          )),
      child: Scaffold(
        backgroundColor: Colors.transparent,
        body: _page(),
      ),
    );
  }

  Widget _page() {
    return  SingleChildScrollView(
      child: Padding(
          padding: const EdgeInsets.all(15.0),
          child: Center(
            child: Column(
              mainAxisAlignment: MainAxisAlignment.start,
              children: [
                const SizedBox(height: 50),
                Text('Welcome',
                style: TextStyle(fontWeight: FontWeight.bold,fontSize: 35),
                ),
                const SizedBox(height: 5),
                Text('Sign-in',
                  style: TextStyle(fontSize: 30),
                ),
                const SizedBox(height: 10),
                _icon(),
                const SizedBox(height: 50),
                _inputField("Enter your email","Email", useremailController),
                const SizedBox(height: 20),
                _inputField("Enter your password","Password", passwordController),
                const SizedBox(height: 1),
                _forget(),
                const SizedBox(height: 50),
                _loginBtn(),
                const SizedBox(height: 20),
                _extraText(),
              ],
            ),
          ),
      ),
    );
  }

  Widget _icon() {
    return Container(
      decoration: BoxDecoration(
          border: Border.all(color: Colors.white, width: 2),
          shape: BoxShape.circle),
      child: const Icon(Icons.person, color: Colors.white, size: 120),
    );
  }

  Widget _inputField(String hintText, String labeltext, TextEditingController controller,
        ) {
    var border = OutlineInputBorder(
        borderRadius: BorderRadius.circular(18),
        borderSide: const BorderSide(color: Colors.white));

       if(labeltext=="Email"){
         return TextField(
           keyboardType: TextInputType.emailAddress,
           style: const TextStyle(color: Colors.white),
           controller: controller,
           decoration: InputDecoration(
             hintText: hintText,
             labelText: labeltext,
             labelStyle: const TextStyle(color: Colors.white70),
             hintStyle: const TextStyle(color: Colors.white70),
             enabledBorder: border,
             focusedBorder: border,
             suffixIcon: Icon(Icons.email,color: Colors.white60,
             ),
           ),

         );
       }
        else return  TextField(
          style: const TextStyle(color: Colors.white),
          controller: controller,
          decoration: InputDecoration(
            hintText: hintText,
            labelText: labeltext,
            labelStyle: const TextStyle(color: Colors.white70),
            hintStyle: const TextStyle(color: Colors.white70),
            enabledBorder: border,
            focusedBorder: border,
            suffixIcon: CupertinoButton(
                onPressed: (){
                  setState(() {
                    isPassword = !isPassword;
                  });
                },
                child: Icon(
                     isPassword ?
                    Icons.visibility
                   : Icons.visibility_off,
                  color: Colors.white60,
                )),
          ),

          obscureText: isPassword,
        );


  }
 Widget _forget(){
   return  Row(
       mainAxisAlignment: MainAxisAlignment.end,
        children: [
          CupertinoButton(
            onPressed: (){
              Routes.instance.push(widget: ForgetScreen(), context: context);
            },
            child: Container(
              child: Text('Forget Password?',
                style: TextStyle(
                  decoration: TextDecoration.underline,
                  fontSize: 16,
                  color: GlobalVariable.PrimaryColor,
                ),
              ),
            ),
          ),
        ],

   );
 }

  Widget _loginBtn() {
    return ElevatedButton(
      onPressed: () async{
        debugPrint("Username : " + useremailController.text);
        debugPrint("Password : " + passwordController.text);
        if (useremailController!= null && passwordController != null) {
          setState(() {
            loading = true;
          });
            _auth.signInWithEmailAndPassword(email: useremailController.text.toString(), password: passwordController.text.toString()).then((value) {
              setState(() {
                loading = false;
              });
              GlobalVariable.fluttertoast('Successfully login');
              Routes.instance.pushAndRemoveUntil(widget: HomeScreen(), context: context);
            }).onError((error, stackTrace){
                GlobalVariable.fluttertoast(error.toString());
                setState(() {
                  loading = false;
                });
            });

        }
      },
      child: loading? CircularProgressIndicator():const SizedBox(
          width: double.infinity,
          child: Text(
            "Sign-in ",
            textAlign: TextAlign.center,
            style: TextStyle(fontSize: 20),
          )),
      style: ElevatedButton.styleFrom(
        shape: const StadiumBorder(),
        primary: Colors.grey,
        onPrimary: Colors.black54,
        padding: const EdgeInsets.symmetric(vertical: 16),
      ),
    );
  }

  Widget _extraText() {
    return Row(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        const Text(
          "Already have account?",
          textAlign: TextAlign.center,
          style: TextStyle(fontSize: 16, color: Colors.white),
        ),
        TextButton(
            onPressed: (){
              Routes.instance.push(widget: SignupScreen(), context: context);
            },

            child: Text("Register",
             style: TextStyle(fontSize: 20,
               decoration: TextDecoration.underline,
               color: GlobalVariable.PrimaryColor,
             )
            ),
        )
      ],
    );

  }
}

