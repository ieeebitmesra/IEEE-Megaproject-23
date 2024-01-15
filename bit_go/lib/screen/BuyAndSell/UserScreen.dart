import 'package:bit_go/screen/BuyAndSell/AddScreen.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:firebase_database/firebase_database.dart';
import 'package:firebase_database/ui/firebase_animated_list.dart';
import 'package:flutter/material.dart';
import 'package:flutter_phone_direct_caller/flutter_phone_direct_caller.dart';
import 'package:page_transition/page_transition.dart';

import '../../constants/global_variable.dart';

class UserScreen extends StatefulWidget {
  const UserScreen({super.key});

  @override
  State<UserScreen> createState() => _UserScreenState();
}

class _UserScreenState extends State<UserScreen> {
  final ref = FirebaseDatabase.instance.ref("buyandsell");
  User? userId = FirebaseAuth.instance.currentUser;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('User Data'),
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
                    return Padding(padding: EdgeInsets.all(8),
                      child: Container(
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
                        child: ListTile(

                          title: Text(snapshot.child('name').value.toString()),
                          subtitle: Text('Price: '+snapshot.child('price').value.toString()),
                          trailing: InkWell(
                              onTap: (){
                                ref.child(snapshot.child('id').value.toString()).remove();
                                GlobalVariable.fluttertoast('Data Deleted successfully');
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
          Navigator.push(context, PageTransition(type: PageTransitionType.leftToRight, child: AddScreen()));

        },
        child: Icon(Icons.add),
      ),
    );
  }



}
