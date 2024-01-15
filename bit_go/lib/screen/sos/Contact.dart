

import 'package:bit_go/constants/global_variable.dart';
import 'package:bit_go/model/sosmodel.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:fluttertoast/fluttertoast.dart';

import '../../DatabaseSqflight/databasehelper.dart';

class ContactScreen extends StatefulWidget {
  const ContactScreen({super.key,});


  @override
  State<ContactScreen> createState() => _ContactScreenState();
}

class _ContactScreenState extends State<ContactScreen> {
  final name1 = TextEditingController();
  final number1 = TextEditingController();

  void dispose() {
    name1.dispose();
    number1.dispose();
    super.dispose();
  }

  DBHelper? dbHelper;
   Future<List<ContactModel>>?  contactlist  ;


    @override
  void initState() {
    // TODO: implement initState
    super.initState();
    dbHelper = DBHelper();
    loaddata();
  }
  loaddata () async{
      contactlist=dbHelper!.getcontactlist();
  }


  @override
  Widget build(BuildContext context) {
    return
         Scaffold(
           appBar: AppBar(
             title: Text('Emergency Contacts'),
             backgroundColor: Colors.red,

           ),
           body:   Column(
               children: [

                 Expanded(
                   child: FutureBuilder(
                       future: contactlist,
                       builder: (context,AsyncSnapshot<List<ContactModel>> snapshot){
                         if(snapshot.hasData){
                           return ListView.builder(
                               itemCount: snapshot.data?.length,
                               itemBuilder: (context,index){
                                 return  Dismissible(
                                   direction: DismissDirection.endToStart,
                                   background: Container(
                                     color: Colors.redAccent,
                                     child: Icon(Icons.delete),
                                   ),
                                   onDismissed:(DismissDirection direction){
                                     setState(() {
                                       dbHelper!.delete(snapshot.data![index].id!);
                                       contactlist = dbHelper!.getcontactlist();
                                       snapshot.data!.remove(snapshot.data![index]);
                                       GlobalVariable.fluttertoast('Contact Deleted Successfully');

                                     });
                                   },
                                   key: ValueKey<int>(snapshot.data![index].id!),
                                   child: Card(
                                     child: ListTile(
                                       contentPadding: EdgeInsets.fromLTRB(3,2, 3, 2),

                                       title:  Text(snapshot.data![index].name.toString().toUpperCase()),
                                       subtitle: Text( snapshot.data![index].number.toString()),

                                     ),
                                   ),
                                 );
                               });

                         }else{
                           return SizedBox(
                                height: double.infinity,
                               width: double.infinity,
                               child: Center(
                                   child: Text('Empty! please add contacts',
                                     style: TextStyle(fontSize: 28),)));

                         }

                       }
                   ),
                 )

               ],
             ),


           floatingActionButton: FloatingActionButton(
             onPressed: (){

               showModalBottomSheet(
                 isScrollControlled: true,
                 backgroundColor: Colors.black45,
                   context: context,
                   builder: (BuildContext context){
                             return SizedBox(
                               height: 600,
                               child:  Column(
                                   children: [
                                     Text('ADD CONTACTS' ,style: TextStyle(fontSize: 20,color: Colors.white,fontWeight: FontWeight.bold),),
                                     SizedBox(height: 30,),
                                     _inputField('enter name here..', 'Name', name1,Icon(Icons.person,color: Colors.white,)),
                                     SizedBox(height: 6,),
                                     _inputField('enter number here..', 'Number ', number1,Icon(Icons.call,color: Colors.white)),
                                     SizedBox(height: 6,),
                                      Row(
                                            mainAxisAlignment: MainAxisAlignment.center,

                                         children: [
                                           ElevatedButton(
                                               onPressed: (){
                                                Navigator.pop(context);
                                               },
                                               child: Container(
                                                 child: Text('Cancel',),
                                                 width: 120,
                                                 alignment: Alignment.center,
                                               )

                                           ),
                                           SizedBox(width: 7,),
                                           ElevatedButton(
                                               onPressed: (){
                                                     print(name1);
                                                     print(number1);
                                                     int numberint = int.parse(number1.text);
                                                         if(number1.text.length!=10||name1.text.length==0) {
                                                           GlobalVariable.fluttertoast('fill the required details properly');
                                                         }else {
                                                           addinlist(name1.text.toString(), numberint);
                                                           Navigator.pop(context);
                                                           GlobalVariable.fluttertoast('Contact saved Successfully');

                                                         }
                                               },
                                               child: Container(
                                                 child: Text('Save',),
                                                 width: 120,
                                                 alignment: Alignment.center,
                                               )

                                           ),
                                         ],
                                       ),


                                   ],
                                 ),

                               );

                   });

             },
             child:  Icon(Icons.add),
           ),

         );
  }




void addinlist (String savename,int num){
  dbHelper!.insert(
      ContactModel(name:savename, number: num )
  ).then((value){
    print("adder*****");
    setState(() {
      contactlist = dbHelper!.getcontactlist();
    });
  }
  );

}

void operoverlay(){
  showModalBottomSheet(
    isScrollControlled: true,

    context: context,
    builder: (ctx) =>
          Overlay(),
  );
}
// widget of overlay screen..........
  Widget _inputField(String hintText, String labeltext, TextEditingController controller,Icon icon
      ) {
    var border = OutlineInputBorder(
        borderRadius: BorderRadius.circular(18),
        borderSide: const BorderSide(color: Colors.white));
    if(labeltext=='Name'){
      return TextField(
        keyboardType: TextInputType.name,
        style: const TextStyle(color: Colors.white),
        controller: controller,
        decoration: InputDecoration(
          hintText: hintText,
          labelText: labeltext,
          labelStyle: const TextStyle(color: Colors.white70),
          hintStyle: const TextStyle(color: Colors.white70),
          enabledBorder: border,
          focusedBorder: border,
          suffixIcon: icon,
        ),

      );
    }else{
      return TextField(
        keyboardType: TextInputType.phone,
        style: const TextStyle(color: Colors.white),
        controller: controller,
        decoration: InputDecoration(
          hintText: hintText,
          labelText: labeltext,
          labelStyle: const TextStyle(color: Colors.white70),
          hintStyle: const TextStyle(color: Colors.white70),
          enabledBorder: border,
          focusedBorder: border,
          suffixIcon: icon,
        ),

      );
    }



  }



}

