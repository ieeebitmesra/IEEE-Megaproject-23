import 'package:bit_go/constants/global_variable.dart';
import 'package:bit_go/screen/cabsharing/AddDate.dart';
import 'package:bit_go/screen/cabsharing/OwnScreen.dart';
import 'package:firebase_database/firebase_database.dart';
import 'package:firebase_database/ui/firebase_animated_list.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/gestures.dart';
import 'package:flutter/material.dart';
import 'package:flutter_phone_direct_caller/flutter_phone_direct_caller.dart';
import 'package:page_transition/page_transition.dart';

class CabSharing extends StatefulWidget {
  const CabSharing({super.key});

  @override
  State<CabSharing> createState() => _CabSharingState();
}

class _CabSharingState extends State<CabSharing> {
 final search = TextEditingController();
 final ref = FirebaseDatabase.instance.ref("cabsharing");

 void dispose() {
   // TODO: implement dispose
   super.dispose();
   search.dispose();
 }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Cab Sharing'),
        backgroundColor: Color.fromARGB(187, 79, 60, 60),
      ),
      body: Column(
          children: [
              Padding(
                 padding: EdgeInsets.fromLTRB(10, 4, 10, 5),
                child: TextFormField(
                  controller: search,
                    decoration: InputDecoration(
                      hintText: 'search by name',
                      border: OutlineInputBorder(),
                      prefixIcon: Icon(CupertinoIcons.search)
                    ),
                  onChanged: (String value){
                    setState(() {

                    });
                  },
                ),
              ) ,

               Expanded(
                   child: FirebaseAnimatedList(

                       query: ref,
                       defaultChild: Text('Loading...'),
                       itemBuilder: (context,snapshot,animation,index){

                        final name = snapshot.child('name').value.toString();

                        if(search.text.isEmpty){
                          return  cabDashboard(
                            snapshot.child('name').value.toString(),
                            snapshot.child('from').value.toString(),
                            snapshot.child('to').value.toString(),
                            snapshot.child('num').value.toString(),
                            snapshot.child('des').value.toString(),
                            snapshot.child('date').value.toString(),
                            snapshot.child('time').value.toString(),
                          );
                        }
                        else if(name.toLowerCase().contains(search.text.toLowerCase())){
                          return  cabDashboard(
                            snapshot.child('name').value.toString(),
                            snapshot.child('from').value.toString(),
                            snapshot.child('to').value.toString(),
                            snapshot.child('num').value.toString(),
                            snapshot.child('des').value.toString(),
                            snapshot.child('date').value.toString(),
                            snapshot.child('time').value.toString(),
                          );
                        }
                          else{
                           return Container();
                        }

                       }),
                 ),


          ],
        ),
      floatingActionButton: FloatingActionButton(
        onPressed: (){
          Navigator.push(context, PageTransition(type: PageTransitionType.leftToRightWithFade, child: OwnScreen()));

        },
        child: Icon(Icons.person),
      ),

    );

  }
  cabDashboard(String name,String from,String to,String num,String des,String date,String time) =>
      Padding(
        padding: EdgeInsets.all(5),
        child: Container(
          child: Container(
              width: double.infinity,
              height: 180,
              decoration: BoxDecoration(
                  color: Colors.grey,
                  borderRadius: BorderRadius.circular(30),
                  boxShadow: [

                    BoxShadow(
                        offset: const Offset(4, 4),
                        color: Theme
                            .of(context)
                            .primaryColor
                            .withOpacity(.5),
                        spreadRadius: 2,
                        blurRadius: 5
                    ),
                    BoxShadow(
                        offset: const Offset(-4, -4),
                        color: Colors.black54,
                        spreadRadius: 2,
                        blurRadius: 5
                    )
                  ]
              ),
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                 Text(name,style: TextStyle(fontSize: 30,color: Colors.white,fontWeight: FontWeight.bold),),
                  Padding(padding: EdgeInsets.all(5),
                    child: Row(
                      children: [
                        Icon(Icons.location_on_outlined),
                        Text(from,style: TextStyle(color: Colors.black,fontSize: 20,fontWeight: FontWeight.w600),),
                        Icon(CupertinoIcons.arrow_right),
                        Text(to,style: TextStyle(color: Colors.black,fontSize: 20,fontWeight: FontWeight.w600),),

                      ],
                    ),
                  ) ,
                  Padding( padding: EdgeInsets.fromLTRB(5, 0, 8, 0),
                    child: Row(
                      children: [

                        Text(des,style: TextStyle(color: Colors.black,fontSize: 18),),

                      ],
                    ),
                  ),

            
                  Padding(
                    padding: EdgeInsets.fromLTRB(5, 0, 5, 2),
                    child: Row(
                      children: [
                        CupertinoButton(
                          onPressed: (){_callNumber(num);},
                          child: Container(
                              decoration: BoxDecoration(
                                  color: Colors.white,
                                  borderRadius: BorderRadius.circular(5),
                                  boxShadow: [

                                    BoxShadow(
                                        offset: const Offset(4, 4),
                                        color: Colors.black54,
                                        spreadRadius: 2,
                                        blurRadius: 5
                                    ),
                                    BoxShadow(
                                        offset: const Offset(-4, -4),
                                        color: Colors.white54,
                                        spreadRadius: 2,
                                        blurRadius: 5
                                    )
                                  ]
                              ),
                              child: Container(

                                child: Row(
                                  children: [
                                    Icon(Icons.call,color: Colors.blue,size: 30,),
                                    Text('Call',style: TextStyle(fontSize: 25),)
                                  ],
                                ),
                              )

                          ),
                        ),
                        Spacer(),
                        Text(date+" | "+time),

                      ],
                    ),
                  )

                ],
              ),

          ),
        ),
      );
 _callNumber(String number) async{
   await FlutterPhoneDirectCaller.callNumber(number);
 }


}
