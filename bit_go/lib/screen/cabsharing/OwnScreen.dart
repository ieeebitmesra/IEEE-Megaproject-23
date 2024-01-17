import 'package:bit_go/constants/global_variable.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:firebase_database/firebase_database.dart';
import 'package:firebase_database/ui/firebase_animated_list.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:page_transition/page_transition.dart';

import 'AddDate.dart';

class OwnScreen extends StatefulWidget {
  const OwnScreen({super.key});

  @override
  State<OwnScreen> createState() => _OwnScreenState();
}

class _OwnScreenState extends State<OwnScreen> {
  final ref = FirebaseDatabase.instance.ref("cabsharing");
  User? userId = FirebaseAuth.instance.currentUser;


  @override
  Widget build(BuildContext context) {
    return
      Scaffold(
        appBar: AppBar(
          title: Text('My Data'),
          backgroundColor: Color.fromARGB(187, 79, 60, 60),
        ),
        body: Column(
          children: [
            Expanded(
              child: FirebaseAnimatedList(

                  query: ref,
                  defaultChild: Text('Loading...'),
                  itemBuilder: (context,snapshot,animation,index){
                    if(snapshot.child('userid').value.toString()==userId?.uid.toString()){
                      return  Padding(
                        padding: EdgeInsets.all(8),
                        child: Container(
                            decoration: BoxDecoration(
                            color: Colors.grey,
                            borderRadius: BorderRadius.circular(30),),
                          child: ListTile(

                            title: Text(snapshot.child('from').value.toString()+" --> "+snapshot.child('to').value.toString()),
                            subtitle: Text(snapshot.child('date').value.toString()+" | "+snapshot.child('time').value.toString()),
                            trailing: InkWell(
                                onTap: (){
                                    ref.child(snapshot.child('id').value.toString()).remove();
                                               GlobalVariable.fluttertoast('Ride Deleted successfully');
                                },
                                child:Container(
                                  decoration: BoxDecoration(
                                      color: Colors.white,
                                      borderRadius: BorderRadius.circular(10)
                                  ),
                                  child: Icon(Icons.delete_rounded,color: Colors.blue,size: 40,),
                                )
                            ),
                          ),
                        ),
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
            Navigator.push(context, PageTransition(type: PageTransitionType.leftToRightWithFade, child: AddCabData()));

          },
          child: Icon(Icons.add),
        ),
      );
  }
  


 }
