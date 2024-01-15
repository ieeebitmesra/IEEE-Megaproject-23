import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';

import '../../constants/global_variable.dart';

class ForgetScreen extends StatefulWidget {
  const ForgetScreen({super.key});

  @override
  State<ForgetScreen> createState() => _ForgetScreenState();
}

class _ForgetScreenState extends State<ForgetScreen> {
  TextEditingController email = new TextEditingController();
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

              Text('forgot password',
                style: TextStyle(fontWeight: FontWeight.bold,fontSize: 30),
              ),
              const SizedBox(height: 5,),
              Text('Enter your email we will send you password recovery link',
                style: TextStyle(fontSize: 20),
              ),
              const SizedBox(height: 10),
            _inputField("Enter your registerd email", "Email", email),
              const SizedBox(height: 50,),
              _loginBtn(),
            ],
          ),
        ),
      ),
    );
  }


  Widget _inputField(String hintText, String labeltext, TextEditingController controller,
      ) {
    var border = OutlineInputBorder(
        borderRadius: BorderRadius.circular(18),
        borderSide: const BorderSide(color: Colors.white));

      return TextField(
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

  Widget _loginBtn() {
    return ElevatedButton(
      onPressed: () async{
        if(email!=null){
          setState(() {
            loading=true;
          });
          await _auth.sendPasswordResetEmail(
              email: email.text.toString()).then((value) {
            GlobalVariable.fluttertoast('Successfully sent password reset link');
            Navigator.pop(context);
            setState(() {
              loading= false;
            });
          }).onError((error, stackTrace) {
            GlobalVariable.fluttertoast(error.toString());
            setState(() {
              loading = false;
            });
          });
        }else{
          GlobalVariable.fluttertoast('input email');
          setState(() {
            loading = false;
          });
        }

      },
      child: loading? CircularProgressIndicator():const SizedBox(
          width: double.infinity,
          child: Text(
            "Reset Password",
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

}
