import 'package:bit_go/constants/Rouets.dart';
import 'package:bit_go/screen/BuyAndSell/MainScreen.dart';
import 'package:bit_go/screen/ERP/ErpOverlayScreen.dart';
import 'package:bit_go/screen/Restaurant/Restraunt.dart';
import 'package:bit_go/screen/TeacherContacts/teachercontact.dart';
import 'package:bit_go/screen/cabsharing/CabScreen.dart';
import 'package:bit_go/screen/sos/sos.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:page_transition/page_transition.dart';


class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  @override
  Widget build(BuildContext context) {
    return
      Scaffold(
        body: ListView(
          padding: EdgeInsets.zero,
          children: [
            Container(
              decoration: BoxDecoration(
                color: Theme
                    .of(context)
                    .primaryColor,
                borderRadius: const BorderRadius.only(
                  bottomRight: Radius.circular(50),
                ),
              ),
              child: Column(
                children: [
                  const SizedBox(height: 50),
                  ListTile(
                    contentPadding: const EdgeInsets.symmetric(horizontal: 30),
                    title: Text('Hello user!', style: Theme
                        .of(context)
                        .textTheme
                        .headlineSmall
                        ?.copyWith(
                        color: Colors.white
                    )),
                    subtitle: Text('Good Morning', style: Theme
                        .of(context)
                        .textTheme
                        .titleMedium
                        ?.copyWith(
                        color: Colors.white54
                    )),
                    trailing: const CircleAvatar(
                      radius: 32,
                      backgroundImage: AssetImage('assets/images/Bit_Logo.png'),
                    ),
                  ),
                  const SizedBox(height: 30)
                ],
              ),
            ),
            Container(
              color: Theme
                  .of(context)
                  .primaryColor,
              child: Container(
                padding: const EdgeInsets.symmetric(horizontal: 30),
                decoration: const BoxDecoration(
                    color: Colors.white,
                    borderRadius: BorderRadius.only(
                        topLeft: Radius.circular(200)
                    )
                ),
                child: GridView.count(
                  shrinkWrap: true,
                  physics: const NeverScrollableScrollPhysics(),
                  crossAxisCount: 2,
                  crossAxisSpacing: 1,
                  mainAxisSpacing: 30,
                  children: [
                    itemDashboard('SOS', Icons.sos, Colors.teal, 'Sos'),
                    itemDashboard('Restaurant', Icons.fastfood, Colors.purple, 'Rest'),
                    itemDashboard('E.R.P', Icons.laptop_chromebook, Colors.indigo, 'Erp'),
                    itemDashboard('Cab Sharing', CupertinoIcons.car_detailed, Colors.deepOrange, 'cabsharing'),
                    itemDashboard('Buy And Sell', Icons.shopify_sharp, Colors.brown, 'buysell'),
                    itemDashboard('Teacher Contact', CupertinoIcons.phone, Colors.pinkAccent, 'Teacher'),
                    itemDashboard('About', CupertinoIcons.question_circle, Colors.blue, 'about'),
                  ],
                ),
              ),
            ),
            const SizedBox(height: 20)
          ],
        ),
      );
  }

  itemDashboard(String title, IconData iconData, Color background,
      String nextpage) =>
      CupertinoButton(
        onPressed: () {
          if (nextpage == "cabsharing") {
            Navigator.push(context, PageTransition(type: PageTransitionType.leftToRightWithFade, child: CabSharing()));
          }
          else if (nextpage == "buysell") {
            Navigator.push(context, PageTransition(type: PageTransitionType.leftToRightWithFade, child: MainScreen()));
          }
          else if (nextpage == "Sos") {
            Navigator.push(context, PageTransition(type: PageTransitionType.leftToRightWithFade, child: SosScreen()));
          }
          else if (nextpage == "Rest") {
            Navigator.push(context, PageTransition(type: PageTransitionType.leftToRightWithFade, child: RestrauntScreen()));

          }
          // else if (nextpage == "Bus") {
          //   //Routes.instance.push(widget: widget, context: context);
          // }
          else if (nextpage == "Erp") {
              ShowBottomScreen();
          }
          else if (nextpage == "Teacher") {
             ShowBottomScreenTeacher();
           }
          else if (nextpage == "about") {
            //Routes.instance.push(widget: widget, context: context);
          }
          else {

          }
        },
        child: Container(
          width: 120,
          height: 120,
          decoration: BoxDecoration(

              color: Colors.white,
              borderRadius: BorderRadius.circular(10),
              boxShadow: [
                BoxShadow(
                    offset: const Offset(5, 5),
                    color: Theme
                        .of(context)
                        .primaryColor
                        .withOpacity(.5),
                    spreadRadius: 2,
                    blurRadius: 5
                ),
                BoxShadow(
                    offset: const Offset(-5, -5),
                    color: Colors.black45,
                    spreadRadius: 2,
                    blurRadius: 5
                ),
              ]
          ),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Container(
                  alignment: Alignment.center,
                  padding: const EdgeInsets.all(12),
                  decoration: BoxDecoration(
                    color: background,
                    shape: BoxShape.circle,
                  ),
                  child: Icon(iconData, color: Colors.white)
              ),
              const SizedBox(height: 4),
             

                 Container(
                   alignment: Alignment.center,
                   width: 105,
                   child: Text(title.toUpperCase(),style: Theme
                        .of(context)
                        .textTheme
                        .titleMedium),
                 ),

              
            ],
          ),
        ),
      );

  void ShowBottomScreen() {
    showModalBottomSheet(
        isScrollControlled: true,
        backgroundColor: Colors.black54,
        context: context,
        builder: (BuildContext context) {
          return ErpOverlayScreen();
        });
  }
  void ShowBottomScreenTeacher() {
    showModalBottomSheet(
        isScrollControlled: true,
        backgroundColor: Colors.black54,
        context: context,
        builder: (BuildContext context) {
          return ContactTeacher();
        });
  }
}