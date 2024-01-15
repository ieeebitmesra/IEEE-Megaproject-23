import 'package:flutter/material.dart';
import 'package:fluttertoast/fluttertoast.dart';

class GlobalVariable{

  static const SecondaryColor = Colors.teal;
  static const backgroundColor = Colors.grey;
  static const PrimaryColor = Color(0xffe73737);
  static const Black87 = Colors.black87;
  static const Black26 = Colors.black26;
  static const grey = Colors.grey;
  static const elevatedbuttoncolor = Colors.orange;


  static dialogbox(BuildContext context,String str){
    showDialog(context: context,
        builder: (context) =>
      AlertDialog(title: Text(str),)
    );
  }
  static fluttertoast(String msg){
    Fluttertoast.showToast(
        msg: msg,
        gravity: ToastGravity.CENTER);

  }

}

