import 'dart:io';

import 'package:bit_go/constants/global_variable.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:firebase_database/firebase_database.dart';
import 'package:flutter/material.dart';
import 'package:image_picker/image_picker.dart';
import 'package:firebase_storage/firebase_storage.dart' as firebase_storage;
class AddScreen extends StatefulWidget {
  const AddScreen({super.key});

  @override
  State<AddScreen> createState() => _AddScreenState();
}

class _AddScreenState extends State<AddScreen> {
   final name = TextEditingController();
   final des = TextEditingController();
   final price = TextEditingController();
   final num = TextEditingController();

   File? _image;
   final picker = ImagePicker();
   firebase_storage.FirebaseStorage storage =firebase_storage.FirebaseStorage.instance;
   final refference = FirebaseDatabase.instance.ref("buyandsell");
   User? userId = FirebaseAuth.instance.currentUser;

   bool loading = false;

   Future getcameraimage()async{
     final pickedfile = await picker.pickImage(source: ImageSource.camera,imageQuality: 20);
     setState(() {
       if(pickedfile!=null){
         _image = File(pickedfile.path);
       }
       else{
         GlobalVariable.fluttertoast('Image not selected');
       }
     });
   }


   @override
  void dispose() {
    // TODO: implement dispose
    super.dispose();
    name.dispose();
    des.dispose();
    price.dispose();
    num.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return  Scaffold(
      appBar: AppBar(
        title: Text("Add Product"),
        backgroundColor: Color.fromARGB(187, 79, 60, 60),
      ),
      body: Container(
        child: Padding(
          padding: EdgeInsets.all(5),
          child: SingleChildScrollView(
            child: Column(
              children: [
                     InkWell(
                       onTap: (){
                         getcameraimage();
                       },
                       child: Container(
                         alignment: Alignment.center,
                         child: Container(
                           height: 150,
                           width: 150,
                            decoration: BoxDecoration(
                                border: Border.all(
                                color: Colors.black
                              )
                            ),
                           child: _image!=null? Image.file(_image!.absolute):
                           Column(
                             children: [
                               Icon(Icons.image,size: 80,),
                                Spacer(),
                                Text('Click to change Text')
                             ],
                           )
                         ),
                       ),
                     ),
                    SizedBox(height: 10,),
                _inputField('Enter Product Name', 'Name', name, Icon(Icons.sell)),
                SizedBox(height: 5,),
                _inputField('Enter Number', 'Number', num, Icon(Icons.phone)),
                SizedBox(height: 5,),
                _inputField('Enter price in INR','Price', price, Icon(Icons.money_rounded)),
                SizedBox(height: 5,),
                _inputField('Describe Product', 'Description', des, Icon(Icons.description)),
                SizedBox(height: 8,),
                ElevatedButton(
                    onPressed: ()async {
                      setState(() {
                        loading =true;
                      });
                      String id = DateTime.now().microsecondsSinceEpoch.toString();

                      firebase_storage.Reference ref = firebase_storage.FirebaseStorage.instance.ref('/buyandsell'+id);
                      firebase_storage.UploadTask uploadtask = ref.putFile(_image!.absolute);
                      /// adding data to firebase realtime database ..
                        Future.value(uploadtask).then((value) async{
                         var newUrl = await ref.getDownloadURL();
                         refference.child(id).set({
                           'id':  id,
                           'name': name.text.toString(),
                           'des' : des.text.toString(),
                           'price' : price.text.toString(),
                           'number' : num.text.toString(),
                           'userid' : userId?.uid.toString(),
                           'image': newUrl.toString(),
                         });
                         setState(() {
                           loading =false;
                             });
                         GlobalVariable.fluttertoast('Data Uploaded');
                        }).onError((error, stackTrace) {
                          setState(() {
                            loading =false;
                          });
                           GlobalVariable.fluttertoast(error.toString());
                       });


                    },
                    child: loading? CircularProgressIndicator(): Text('Uplode')),

              ],
            ),
          ),
        ),
      ),
    );
  }

  Widget _inputField(String hintText, String labeltext, TextEditingController controller,Icon icon
      ) {
    var border = OutlineInputBorder(
        borderRadius: BorderRadius.circular(18),
        borderSide: const BorderSide(color: Colors.black));
    if(labeltext=='Description'){
      return TextField(
        maxLines: 2,
        keyboardType: TextInputType.name,
        style: const TextStyle(color: Colors.black54),
        controller: controller,
        decoration: InputDecoration(
          hintText: hintText,
          labelText: labeltext,
          labelStyle: const TextStyle(color: Colors.black54),
          hintStyle: const TextStyle(color: Colors.black54),
          enabledBorder: border,
          focusedBorder: border,
          suffixIcon: icon,

        ),

      );
    }
    else if(labeltext=='Price'|| labeltext =='Number'){
      return TextField(
        keyboardType: TextInputType.number,
        style: const TextStyle(color: Colors.black54),
        controller: controller,
        decoration: InputDecoration(
          hintText: hintText,
          labelText: labeltext,
          labelStyle: const TextStyle(color: Colors.black54),
          hintStyle: const TextStyle(color: Colors.black54),
          enabledBorder: border,
          focusedBorder: border,
          suffixIcon: icon,

        ),

      );
    }
    return TextField(
      style: const TextStyle(color: Colors.black54),
      controller: controller,
      decoration: InputDecoration(
        hintText: hintText,
        labelText: labeltext,
        labelStyle: const TextStyle(color: Colors.black54),
        hintStyle: const TextStyle(color: Colors.black54),
        enabledBorder: border,
        focusedBorder: border,
        suffixIcon: icon,

      ),

    );

  }

}
