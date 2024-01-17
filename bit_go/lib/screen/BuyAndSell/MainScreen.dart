import 'package:bit_go/screen/BuyAndSell/UserScreen.dart';
import 'package:firebase_database/firebase_database.dart';
import 'package:firebase_database/ui/firebase_animated_list.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_phone_direct_caller/flutter_phone_direct_caller.dart';
import 'package:page_transition/page_transition.dart';

import '../cabsharing/AddDate.dart';

class MainScreen extends StatefulWidget {
  const MainScreen({super.key});

  @override
  State<MainScreen> createState() => _MainScreenState();
}

class _MainScreenState extends State<MainScreen> {
  final search = TextEditingController();
  final ref = FirebaseDatabase.instance.ref("buyandsell");

  @override
  void dispose() {
    // TODO: implement dispose
    super.dispose();
    search.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Buy And Sell'),
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
                    return  buyDashboard(
                      snapshot.child('name').value.toString(),
                      snapshot.child('des').value.toString(),
                      snapshot.child('price').value.toString(),
                      snapshot.child('number').value.toString(),
                      snapshot.child('image').value.toString(),
                    );
                  }
                  else if(name.toLowerCase().contains(search.text.toLowerCase())){
                    return  buyDashboard(
                      snapshot.child('name').value.toString(),
                      snapshot.child('des').value.toString(),
                      snapshot.child('price').value.toString(),
                      snapshot.child('number').value.toString(),
                      snapshot.child('image').value.toString(),
                    );
                  }
                  else{
                    return Container();
                  }

                }),
          )

        ],
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: (){
          Navigator.push(context, PageTransition(type: PageTransitionType.leftToRightWithFade, child: UserScreen()));

        },
        child: Icon(Icons.person_rounded),
      ),
    );
  }
  Widget buyDashboard(String name,String des,String price,String num,String image ){
    return  Padding(padding: EdgeInsets.all(6),
      child: Container(
        decoration: BoxDecoration(
            color: Colors.brown,
            borderRadius: BorderRadius.circular(20)
        ),
        width: double.infinity,
        height: 180,
        child: Row(
          children: [
            ClipRRect(
                borderRadius: BorderRadius.circular(20),
                child: Image.network(image)),
            Padding(padding: EdgeInsets.fromLTRB(8,2, 0, 1),
              child: Container(
                width: 200,
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                      Text(name,style: TextStyle(fontSize: 20,fontWeight: FontWeight.w700,),),
                       Text('Price: '+price+'/-',style: TextStyle(fontSize: 16,fontWeight: FontWeight.bold,color: Colors.white),),
                       SizedBox(height: 6,),


                       Expanded(

                           child: Text(des,
                           maxLines: 4,
                             style: TextStyle(
                               fontSize: 13,
                               overflow: TextOverflow.ellipsis,
                               color: Colors.white70,
                             ),
                           ),

                       ),



                     Spacer(),


                    InkWell(
                        onTap: (){
                          _callNumber(num);
                        },
                        child: Container(
                          width: MediaQuery.of(context).size.width*0.55,
                          decoration: BoxDecoration(
                              color: Colors.blueAccent,
                              borderRadius: BorderRadius.circular(10)
                          ),
                          child: Row(
                            mainAxisAlignment: MainAxisAlignment.center,
                            children: [
                              Text('Call',style: TextStyle(fontSize: 30,color: Colors.white),)
                            ],
                          ),
                        )

                    ),

                  ],
                ),
              ),
            ),


          ],
        ),
      ),
    );
  }

  _callNumber(String number) async{
    await FlutterPhoneDirectCaller.callNumber(number);
  }
}
