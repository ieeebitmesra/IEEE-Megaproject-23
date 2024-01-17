import 'package:flutter/material.dart';
import 'package:neon/neon.dart';

Widget NeonText(String s){
  return  Neon(
      text: s,
      color: Colors.red,
      font: NeonFont.Monoton,
      flickeringText: true,
      flickeringLetters: null,
      glowingDuration: new Duration(milliseconds: 300),
  );
}
