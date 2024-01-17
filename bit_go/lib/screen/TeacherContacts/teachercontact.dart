import 'package:flutter/material.dart';
import 'package:url_launcher/url_launcher.dart';

class ContactTeacher extends StatefulWidget {
  const ContactTeacher({super.key});

  @override
  State<ContactTeacher> createState() => _ContactTeacherState();
}

class _ContactTeacherState extends State<ContactTeacher> {
  String dropdownvalue = 'cse';
  final cse =  Uri.parse('https://www.bitmesra.ac.in/Show_Faculty_List?cid=1&deptid=70');
  final eee =  Uri.parse('https://www.bitmesra.ac.in/Display_Faculty_As_List?cid=1&deptid=71');
  final ece =  Uri.parse('https://www.bitmesra.ac.in/Show_Faculty_List?cid=1&deptid=72');
  final bio =  Uri.parse('https://www.bitmesra.ac.in/Show_Faculty_List?cid=1&deptid=51');
  final mech =  Uri.parse('https://www.bitmesra.ac.in/Display_Faculty_As_List?cid=1&deptid=74');
  final chem =  Uri.parse('https://www.bitmesra.ac.in/Show_Faculty_List?cid=1&deptid=69');
  final production =  Uri.parse('https://www.bitmesra.ac.in/Show_Faculty_List?cid=1&deptid=76');
  final aiml =  Uri.parse('https://www.bitmesra.ac.in/Display_Faculty_As_List?cid=1&deptid=70');
  final civil =  Uri.parse('https://www.bitmesra.ac.in/Show_Content_Section?cid=1&pid=361');


  @override
  Widget build(BuildContext context) {
    return
      SizedBox(
        height: 400,
        width: double.infinity,
        child: Column(
          children: [
            Text('Select your Branch Below',style: TextStyle(fontSize: 25,color: Colors.white),),

            DropdownButton(
              elevation: 8,
                    dropdownColor: Colors.black,
                value: dropdownvalue,
                  icon: Icon(Icons.list,color: Colors.white,),
                style: TextStyle(color: Colors.white),
                underline: Container(
                  width: double.infinity,
                  height: 2,
                  color: Colors.white,
                ),
              onChanged: (String? s){
                   setState(() {
                     dropdownvalue = s!;
                   });
            },
               items: [
                 DropdownMenuItem<String>(
                  value: 'eee',
                  child: Text('E.E.E'),
                ),
                DropdownMenuItem<String>(
                  value: 'aiml',
                  child: Text('AI/ML'),
                ),
                DropdownMenuItem<String>(
                  value: 'cse',
                  child: Text('C.S.E'),
                ),
                DropdownMenuItem<String>(
                  value: 'mec',
                  child: Text('Mechanical'),
                ),
                DropdownMenuItem<String>(
                  value: 'ece',
                  child: Text('E.C.E'),
                ),
                DropdownMenuItem<String>(
                  value: 'civil',
                  child: Text('Civil'),
                ),
                DropdownMenuItem<String>(
                  value: 'production',
                  child: Text('Production'),
                ),
                DropdownMenuItem<String>(
                  value: 'bio',
                  child: Text('Bio-Tech'),
                ),
                DropdownMenuItem<String>(
                  value: 'chem',
                  child: Text('Chemical'),
                ),

               ],

            ),

            ElevatedButton(
                onPressed: (){
                if(dropdownvalue=='cse'){
                  openurl(cse );
                }
                else if(dropdownvalue=='eee'){
                  openurl(eee );
                }
                else if(dropdownvalue=='aiml'){
                  openurl(aiml );
                }
                else if(dropdownvalue=='mech'){
                  openurl(mech );
                }
                else if(dropdownvalue=='chem'){
                  openurl(chem);
                }
                else if(dropdownvalue=='civil'){
                  openurl(civil);
                }
                else if(dropdownvalue=='bio'){
                  openurl(bio);
                }
                else if(dropdownvalue=='ece'){
                  openurl(ece);
                }
                else{
                  openurl(production);
                }
                },
                child: Text('Open List'))

          ],
        ),
      );
  }
 void openurl(Uri u){
   Navigator.pop(context);
   setState(() {
     launchUrl(
       u,
       mode: LaunchMode.externalApplication,
     );
   });
 }

}
