import 'dart:async';

import 'package:bit_go/constants/global_variable.dart';
import 'package:bit_go/constants/global_variable.dart';
import 'package:bit_go/screen/sos/sosBottomoverlay.dart';
import 'package:bit_go/widgets/neonbutton.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_phone_direct_caller/flutter_phone_direct_caller.dart';
import 'package:fluttertoast/fluttertoast.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';
import 'package:url_launcher/url_launcher.dart';
import '../../constants/Rouets.dart';
import '../../constants/global_variable.dart';
import '../../constants/global_variable.dart';
import '../../constants/global_variable.dart';
import '../../constants/global_variable.dart';
import '../../model/sosmodel.dart';
import 'Contact.dart';

class SosScreen extends StatefulWidget {
  const SosScreen({super.key});

  @override
  State<SosScreen> createState() => _SosScreenState();
}

class _SosScreenState extends State<SosScreen> {
// database...




  //calling function
  _callNumber(String number) async{
       await FlutterPhoneDirectCaller.callNumber(number);
  }


  //opening static map
  Future<void> openmap(String loc) async {

    String googleurl = 'https://www.google.co.in/maps/search/$loc';

    final Uri _url = Uri.parse(googleurl);
    try{
      await launchUrl(_url);
    }catch (e){
      print(e);
    }
  }

  @override
  Widget build(BuildContext context) {
    return  Scaffold(
      body: Padding(
        padding: EdgeInsets.all(5),
        child: SingleChildScrollView(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
             ClipRRect(
                  borderRadius: BorderRadius.circular(50),
                 child: Image.asset("assets/images/sos.jpg",width: double.infinity,height: 240,fit: BoxFit.fill,)),
                 SizedBox(height: 4,),
                Text(" EMERGENCY",style: TextStyle(fontSize: 25,fontWeight: FontWeight.bold),),
                SizedBox(height: 4,),
                Container(
                  height: 180,
                  width: MediaQuery.of(context).size.width,
                  child: ListView(
                    physics: BouncingScrollPhysics(),
                    scrollDirection: Axis.horizontal,
                    children: [
                        itemDashboard('police',Icons.local_police,'Call-100'),
                      itemDashboard('BIT-dispensary',Icons.local_hospital_rounded,'Call-100'),
                      itemDashboard('fire',Icons.fire_truck,'Call-100'),
                      itemDashboard('hospital',Icons.local_hospital_outlined,'Call-100'),

                    ],
                  ),
                ),
              SizedBox(height: 2,),
              Text(" Explore LiveSafe",style: TextStyle(fontSize: 25,fontWeight: FontWeight.bold),),
              SizedBox(height: 0,),
              Container(
                height: 130,
                width: MediaQuery.of(context).size.width,
                child: ListView(
                  physics: BouncingScrollPhysics(),
                  scrollDirection: Axis.horizontal,
                  children: [
                    itemDashboardexplore('Police', Image.asset('assets/sos/police.png')),
                    itemDashboardexplore('BIT-Dispensary',Image.asset('assets/sos/hospital.png')),
                    itemDashboardexplore('Pharma',Image.asset('assets/sos/pharma.png')),
                    itemDashboardexplore('Bus-Stand',Image.asset('assets/sos/busstation.png')),
                    itemDashboardexplore('Hospital',Image.asset('assets/sos/hospital.png')),
                  ],
                ),
              ),

              CupertinoButton(
                onPressed: (){
                  Routes.instance.push(widget: ContactScreen(), context: context);
                },
                child: Container(
                  alignment: Alignment.center,
                  width: double.infinity,
                   decoration: BoxDecoration(
                     borderRadius: BorderRadius.circular(20),
                     color: Colors.grey,
                   ),
                  child: Text('Contacts',style: TextStyle(fontSize: 30,),),
                ),
              ),

                CupertinoButton(
                  onPressed: (){
                    ShowBottomScreen();
                  },
                  child: Container(
                     width: double.infinity,
                    decoration: BoxDecoration(
                        color: Colors.black,
                        borderRadius: BorderRadius.circular(100)
                    ),
                      child: NeonText('SOS'),
                  ),
                )

            ],
          ),
        ),
      ),
    );
  }


  itemDashboard(String title, IconData iconData,String description ) => CupertinoButton(
    onPressed: (){
        if(title=='police'){
          _callNumber('100');
        }
        else if(title=='BIT-dispensary'){
          _callNumber('6512276009');
        }
        else if(title=='fire'){
          _callNumber('101');
        }
        else if(title=='hospital'){
          _callNumber('108');
        }
        else{

        }

    },
    child: Container(
      height: 150,
      width: MediaQuery.of(context).size.width*0.5,
      decoration: BoxDecoration(
          gradient: LinearGradient(
              colors: [
                Colors.deepOrangeAccent,
                Colors.yellowAccent,
                Colors.black54,
              ]
          ),

          borderRadius: BorderRadius.circular(30),
          boxShadow: [
            BoxShadow(
                offset: const Offset(0, 5),
                color: Theme.of(context).primaryColor.withOpacity(.2),
                spreadRadius: 2,
                blurRadius: 5
            )
          ]
      ),
      child: Padding(
        padding: EdgeInsets.all(15),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Container(
                padding: const EdgeInsets.all(15),
                decoration: BoxDecoration(
                  color: Colors.red,
                  shape: BoxShape.circle,
                ),
                child: Icon(iconData, color: Colors.white)
            ),
            const SizedBox(height: 8),
            Text(title.toUpperCase(), style: Theme.of(context).textTheme.titleMedium),
            const SizedBox(height: 4),
            Text(description, style: Theme.of(context).textTheme.titleMedium)
          ],
        ),
      ),
    ),
  );

// calling live safe function here

  itemDashboardexplore(String title, Image image ) => CupertinoButton(
    onPressed: (){
      if(title=='Police'){
        openmap('police station near me');
      }
      else if(title=='BIT-Dispensary'){
        openmap('BIT Mesra Ranchi Dispensary');
      }
      else if(title=='Pharma'){
        openmap('pharma or medical shop near me');
      }
      else if(title=='Bus-Stand'){
        openmap('bus stand near me');
      }
      else{
        openmap('hospital near me');
      }

    },
    child:
         Column(
           children: [
             Card(
               elevation: 3,
               shape: RoundedRectangleBorder(
                 borderRadius: BorderRadius.circular(20),
               ),
               child: Container(
                 height: 50,
                 width: 50,
                 child: Center(
                   child: image,
                 ),
               ),
             ),
             Text(title,
             style: TextStyle(
               fontSize: 20,
               color: Colors.blue,
             ),),
           ],
         )

  );

  // show bottom overlay screen here////
  void ShowBottomScreen(){

    showModalBottomSheet(
        isScrollControlled: true,
        backgroundColor: Colors.black54,
        context: context,
        builder: (BuildContext context){
          return SosBottomOverlay();

        });
  }
}
