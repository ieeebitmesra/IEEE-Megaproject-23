import 'package:firebase_auth/firebase_auth.dart';
import 'package:firebase_database/firebase_database.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:intl/intl.dart';

import '../../constants/global_variable.dart';

class AddCabData extends StatefulWidget {
  const AddCabData({super.key});

  @override
  State<AddCabData> createState() => _AddCabDataState();
}

class _AddCabDataState extends State<AddCabData> {
  final num = TextEditingController();
  final name = TextEditingController();
  final flexi = TextEditingController();
  final from = TextEditingController();
  final to  = TextEditingController();
  DateTime datetime = DateTime.now();
  TimeOfDay timeOfDay = TimeOfDay(hour: 8, minute: 30);
  User? userId = FirebaseAuth.instance.currentUser;

  final databaseref = FirebaseDatabase.instance.ref("cabsharing");
  bool loading = false;

  @override
  void dispose() {
    // TODO: implement dispose
    num.dispose();
    flexi.dispose();
    from.dispose();
    to.dispose();
    super.dispose();
  }

  void _showtimepicker(){
    showTimePicker(context: context,
        initialTime: TimeOfDay.now()
    ).then((value) {
      setState(() {
        timeOfDay = value!;
        print(value);
      });
    });
  }
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Fill Travel Data'),
        backgroundColor: Color.fromARGB(187, 79, 60, 60),
      ),
          body : Container(
           color: Colors.black87,
            height: MediaQuery.of(context).size.height,
          child: SingleChildScrollView(
            child: Column(
              children: [
                _inputField('Enter name', 'Name', name, Icon(Icons.person_rounded,color: Colors.white,)),
                SizedBox(height: 30,),
                _inputField('Starting point..', "From", from, Icon(CupertinoIcons.location_solid,color: Colors.white,)),
                SizedBox(width: 5,),
                Icon(CupertinoIcons.arrow_down,color: Colors.white,),
                SizedBox(width: 5,),
                _inputField('Ending point', "To", to, Icon(CupertinoIcons.location_solid,color: Colors.white,)),
                SizedBox(height: 10,),
                _inputField("flexiblity..", "description", flexi, Icon(Icons.details,color: Colors.white,)),
                SizedBox(height: 10,),
                _inputField("phone number", "Number",num , Icon(CupertinoIcons.phone,color: Colors.white,)),
                SizedBox(height: 10,),
                Row(
                  children: [
                    Text(DateFormat('dd-MM-yyyy').format(datetime),style: TextStyle(color: Colors.white),),
                    CupertinoButton(
                        onPressed: (){
                          showdate();
                        },
                        child: Icon(CupertinoIcons.calendar,size: 40,color: Colors.blueAccent,)),

                    Spacer(),
                    Text(timeOfDay.format(context).toString(),style: TextStyle(color:Colors.white )),
                    MaterialButton(
                      onPressed: _showtimepicker,
                      child: Icon(CupertinoIcons.timer,color: Colors.blue,),
                    ),

                  ],
                ),
                ElevatedButton(
                    onPressed: () {
                      print(userId?.uid.toString());
                      setState(() {
                        loading = true;
                      });
                      if (from != null && to != null && num.text
                          .toString()
                          .length == 10 && datetime != null &&
                          timeOfDay != null) {
                        String dateformat1 = DateFormat('dd-MM-yyyy').format(datetime);
                        String id = DateTime.now().microsecondsSinceEpoch.toString();
                        databaseref.child(id).set({
                          'name': name.text.toString(),
                          'from': from.text.toString(),
                          'to': to.text.toString(),
                          'des': flexi.text.toString(),
                          'num': num.text.toString(),
                          'date': dateformat1.toString(),
                          'time': timeOfDay.toString().substring(10,15),
                           'userid' : userId?.uid.toString(),
                            'id' : id,
                        }).then((value) {
                          GlobalVariable.fluttertoast('Ride Added Successfully');
                          setState(() {
                            loading = false;
                          });
                        }).onError((error, stackTrace) {
                          GlobalVariable.fluttertoast(error.toString());
                          setState(() {
                            loading = false;
                          });
                        });
                      }
                      else{
                        GlobalVariable.fluttertoast('Fill all required details properly');
                        setState(() {
                          loading = false;
                        });
                      }
                      },
                    child: loading? CircularProgressIndicator(): Text('Done'))

              ],
            ),
          ),
        ),

    );
  }

  Widget _inputField(String hintText, String labeltext, TextEditingController controller,Icon icon
      ) {
    var border = OutlineInputBorder(
        borderRadius: BorderRadius.circular(18),
        borderSide: const BorderSide(color: Colors.white));
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

  }

  void showdate(){
    showDatePicker(
      context: context,
      initialDate: DateTime.now(),
      firstDate: DateTime.now(),
      lastDate: DateTime(2030),
    ).then((value) {
      setState(() {
        datetime = value!;
      });
    });
  }
}
