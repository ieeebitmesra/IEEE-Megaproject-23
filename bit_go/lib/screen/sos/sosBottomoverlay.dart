
import 'package:bit_go/constants/global_variable.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:geolocator/geolocator.dart';
import 'package:permission_handler/permission_handler.dart';
import 'package:telephony/telephony.dart';
import '../../DatabaseSqflight/databasehelper.dart';
import '../../model/sosmodel.dart';
import '../../widgets/neonbutton.dart';


class SosBottomOverlay extends StatefulWidget {
  const SosBottomOverlay({super.key});

  @override
  State<SosBottomOverlay> createState() => _SosBottomOverlayState();
}

class _SosBottomOverlayState extends State<SosBottomOverlay> {

  String lat='Loading..';
  String lon='Loading..';

  //sendinf sms



// till here ....



  void getcurrentlocation() async{
    await Geolocator.requestPermission().then((value) {

    }).onError((error, stackTrace) {
      print("error => "+ error.toString());
    });
    Position ps = await Geolocator.getCurrentPosition(desiredAccuracy: LocationAccuracy.high);
    lat = ps.latitude.toString();
    lon =ps.longitude.toString();
    setState(() {

    });
  }
  @override
  void initState() {
    // TODO: implement initState
    super.initState();
    getcurrentlocation();
    GlobalVariable.fluttertoast("Wait till your location is fetched..");

  }


  @override
  Widget build(BuildContext context) {
    return
    SizedBox(
      height: 450,
      child:  Column(
        children: [
          NeonText("EMERGENCY"),
          SizedBox(height: 10,),
          ElevatedButton(
              onPressed: () async {
                List<ContactModel> cc =  await DBHelper().getcontactlist();
                int length = cc.length;
                final Telephony telephony = Telephony.instance;
                if(length==0){
                   GlobalVariable.fluttertoast('Empty Contacts');
                }
                else {
                  for (int i = 0; i < length; i++) {
                    telephony.sendSms(
                        to: cc[i].number.toString(),
                        message: "Emergency please help ASAP :- https://www.google.com/maps/search/?api=1&query=${double
                            .parse(lat)},${double.parse(lon)}"

                    );
                    GlobalVariable.fluttertoast(
                        'location sent to ${cc[i].name}');
                  }

                  GlobalVariable.fluttertoast('Alert send to all contacts');
                }

              },
              child: Text('Send To Emergency Contacts')),
          SizedBox(height: 8,),
          Padding(
            padding: EdgeInsets.all(6),
            child: Container(
              width: double.infinity,
              alignment: Alignment.center,
              decoration: BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.circular(100)
              ),
              child:  Text("lat == $lat & lon == $lon",style: TextStyle(fontSize: 18),),


            ),
          ),




        ],
      ),

    );

  }



}
