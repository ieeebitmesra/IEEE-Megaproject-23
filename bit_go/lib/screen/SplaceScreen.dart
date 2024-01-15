import 'package:animated_splash_screen/animated_splash_screen.dart';
import 'package:bit_go/constants/assets_images.dart';
import 'package:bit_go/screen/AuthScreen/Login.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

class SplaceScreen extends StatelessWidget {
  const SplaceScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return  Container(
      height: MediaQuery.of(context).size.height,
      width: MediaQuery.of(context).size.width,
      decoration:  BoxDecoration(
        color: Colors.black,
        image: DecorationImage(
          image: AssetImage("assets/images/new_splace.jpg"),
          opacity: 0.8,
          fit: BoxFit.cover,
        ),
      ),
      child: Column(
        children: [

          SizedBox(height: 300,),
          Image.asset(AssetsImg.instance.bitlogo,
          width: 200,
            height: 200,
          ),
          SizedBox(height: 30,),



        ],
      ),


    );
  }
}
