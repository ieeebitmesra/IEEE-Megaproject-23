import 'package:bit_go/screen/Restaurant/foodmodel.dart';
import 'package:carousel_slider/carousel_slider.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_phone_direct_caller/flutter_phone_direct_caller.dart';
import 'package:url_launcher/url_launcher.dart';

class RestrauntScreen extends StatefulWidget {
  const RestrauntScreen({super.key});

  @override
  State<RestrauntScreen> createState() => _RestrauntScreenState();
}

class _RestrauntScreenState extends State<RestrauntScreen> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Food',style: TextStyle(fontWeight: FontWeight.bold,fontSize: 30),),
        backgroundColor: Color.fromARGB(187, 79, 60, 60),
      ),
      body:  Padding(padding: EdgeInsets.all(2),
        child: Column(

          children: [

            Container(
              decoration: BoxDecoration(
                   color: Color.fromARGB(61, 79, 60, 60),
                  borderRadius: BorderRadius.circular(20)
              ),
              child: CarouselSlider(
                options: CarouselOptions(
                    aspectRatio: 1.5,
                    autoPlay: true,
                    enlargeCenterPage: true,
                    enlargeFactor: 0.3
                ),
                items: List.generate(favfood.length,
                        (index) => Card(
                        elevation: 10,
                        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20),
                        ),
                        child: Container(
                          decoration: BoxDecoration(
                              borderRadius: BorderRadius.circular(20),
                              image: DecorationImage(
                                  fit: BoxFit.cover,
                                  image: AssetImage(imgslider[index]))
                          ),
                          child: Align(
                            alignment: Alignment.bottomLeft,
                            child: Text(
                              favfood[index],
                              style: TextStyle(
                                  color: Colors.white,
                                  fontWeight: FontWeight.bold,
                                  fontSize: 30,
                                  fontStyle: FontStyle.italic
                              ),
                            ),
                          ),
                        )
                    )),
              ),
            ),
            Text('Outlet near you',style: TextStyle(fontSize: 25,fontWeight: FontWeight.w700,),),
            Expanded(
              child: ListView.builder(
                      itemCount: outletspos.length,
                      itemBuilder: (context,index){
                     return outletsinfo(outlets[index], outletspos[index], outletsnum[index]);
                  }),
            ),

          ],
        )
      )
    );
  }
  Widget outletsinfo (String name,String map,String num){
    return Padding(padding: EdgeInsets.all(6),
      child: Container(
        decoration: BoxDecoration(
            color: Colors.brown,
            borderRadius: BorderRadius.circular(20)
        ),
        width: double.infinity,
        height: 120,
        child: Row(
          children: [
            ClipRRect(
                borderRadius: BorderRadius.circular(20),
                child: Image.asset('assets/food/restraunt.jpg',width: 150,)),
            Padding(padding: EdgeInsets.fromLTRB(8,2, 0, 1),
              child: Column(
                children: [
                  Text(name,style: TextStyle(color: Colors.white,fontSize: 20,fontWeight: FontWeight.w600),),
                  Text('Closing at 9:30 Pm',style: TextStyle(color: Colors.redAccent,fontSize: 15),),
                  SizedBox(height: 20,),
                  Row(
                    children: [
                      InkWell(
                        onTap: (){
                            _callNumber(num);
                        },
                        child: Container(
                          decoration: BoxDecoration(
                              color: Colors.white,
                              borderRadius: BorderRadius.circular(10)
                          ),
                          child: Row(
                            children: [
                              Icon(Icons.call,color: Colors.blue,),
                              Text('Call')
                            ],
                          ),
                        )
                          
                      ),
                       SizedBox(width: 50,),
                      InkWell(
                        onTap: (){
                          openmap(map);
                        },
                          child: Container(
                            decoration: BoxDecoration(
                                color: Colors.white,
                                borderRadius: BorderRadius.circular(10)
                            ),
                            child: Row(
                              children: [
                                Icon(Icons.location_on_rounded,color: Colors.blue,),
                                Text('Map')
                              ],
                            ),
                          )
                      )
                    ],
                  )
                ],
              ),
            )
          ],
        ),
      ),
    );
  }

  Future<void> openmap(String loc) async {

    final Uri _url = Uri.parse(loc);
    try{
      await launchUrl(_url);
    }catch (e){
      print(e);
    }
  }

  _callNumber(String number) async{
    await FlutterPhoneDirectCaller.callNumber(number);
  }

}
