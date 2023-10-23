# This files contains your custom actions which can be used to run
# custom Python code.
#
# See this guide on how to implement these action:
# https://rasa.com/docs/rasa/custom-actions


# This is a simple example for a custom action which utters "Hello World!"

from typing import Any, Text, Dict, List

from rasa_sdk import Action, Tracker
from rasa_sdk.executor import CollectingDispatcher
#
#
class ActionHelloWorld(Action):

    def name(self) -> Text:
        return "action_hello_world"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:

        dispatcher.utter_message(text="Hello World!")

        return []
#                                     PURCHASE REQUEST                                                #
class ActionPendingPR(Action):

    def name(self) -> Text:
        return "action_pending_pr"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:

        dispatcher.utter_message(text="Purchase Requisition")

        return []
    
class ActionPRItemList(Action):

    def name(self) -> Text:
        return "action_pr_itemlist"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        pr_no = tracker.get_slot("prnumber")
        print("PR itemlist",pr_no)
        dispatcher.utter_message(text="Purchase Requisition Item List")

        return []
    
class ActionPRItemDescription(Action):

    def name(self) -> Text:
        return "action_pr_description"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        pr_no = tracker.get_slot("prnumber")
        item_no = tracker.get_slot("pritemnumber")
        
        print("PR description",pr_no,",",item_no)
        dispatcher.utter_message(text="Purchase Requisition Description")

        return []
    
class ActionPRApprove(Action):

    def name(self) -> Text:
        return "action_pr_approve"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        pr_no = tracker.get_slot("prnumber")
        print("PR approve",pr_no)
        dispatcher.utter_message(text="Purchase Request Approved")

        return []
    
class ActionPRReject(Action):

    def name(self) -> Text:
        return "action_pr_reject"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        pr_no = tracker.get_slot("prnumber")
        print("PR reject",pr_no)
        dispatcher.utter_message(text="Purchase Request Rejected")

        return []
    
#                                     PURCHASE REQUEST                                                #

#                                          PURCHASE ORDER                                                  #

class ActionPendingPO(Action):

    def name(self) -> Text:
        return "action_pending_po"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:

        dispatcher.utter_message(text="Purchase Order")

        return []

class ActionPOItemList(Action):

    def name(self) -> Text:
        return "action_po_itemlist"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        po_no = tracker.get_slot("ponumber")
        print("PO itemlist",po_no)
        dispatcher.utter_message(text="Purchase Order Item List")

        return []
    
class ActionPOItemDescription(Action):

    def name(self) -> Text:
        return "action_po_description"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        po_no = tracker.get_slot("ponumber")
        item_no = tracker.get_slot("poitemnumber")
        
        print("PO Description",po_no,",",item_no)
        dispatcher.utter_message(text="Purchase Order Description")

        return []

class ActionPOApprove(Action):

    def name(self) -> Text:
        return "action_po_approve"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        po_no = tracker.get_slot("ponumber")
        print("PO Approve",po_no)
        dispatcher.utter_message(text="Purchase Order Approved")

        return []
        
class ActionPOReject(Action):

    def name(self) -> Text:
        return "action_po_reject"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        po_no = tracker.get_slot("ponumber")
        print("PO Reject",po_no)
        dispatcher.utter_message(text="Purchase Order Rejected")

        return []
    

#                                          PURCHASE ORDER                                                  #

#                                          LEAVE REQUEST                                                  #

class ActionPendingLeave(Action):

    def name(self) -> Text:
        return "action_pending_leave"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:

        dispatcher.utter_message(text="Leave Request")

        return []

class ActionLeaveDescription(Action):

    def name(self) -> Text:
        return "action_leave_description"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        pl_no = tracker.get_slot("LeaveId")
        print("Leave Description",pl_no)
        dispatcher.utter_message(text="Leave Description")

        return []
    
class ActionPLApprove(Action):

    def name(self) -> Text:
        return "action_pl_approve"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        pl_no = tracker.get_slot("LeaveId")
        print("PL Approve",pl_no)
        dispatcher.utter_message(text="Leave Request Approved")

        return []
        
class ActionPLReject(Action):

    def name(self) -> Text:
        return "action_pl_reject"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        pl_no = tracker.get_slot("LeaveId")
        print("PL Reject",pl_no)
        dispatcher.utter_message(text="Leave Request Rejected")

        return []
    

#                                          LEAVE REQUEST                                                  #


#                                    BUSINESS TRIP REQUEST                                                #

class ActionPendingTrip(Action):

    def name(self) -> Text:
        return "action_pending_trip"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:

        dispatcher.utter_message(text="Trip Request")

        return []

class ActionTripDescription(Action):

    def name(self) -> Text:
        return "action_trip_description"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        bt_no = tracker.get_slot("TripId")
        print("Trip Description",bt_no)
        dispatcher.utter_message(text="Business Trip Description")

        return []
    
class ActionBTApprove(Action):

    def name(self) -> Text:
        return "action_bt_approve"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        BT_no = tracker.get_slot("TripId")
        print("BT Approve",BT_no)
        dispatcher.utter_message(text="Business Trip Request Approved")

        return []
        
class ActionBTReject(Action):

    def name(self) -> Text:
        return "action_bt_reject"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        BT_no = tracker.get_slot("TripId")
        print("BT Reject",BT_no)
        dispatcher.utter_message(text="Business Trip Request Rejected")

        return []
    

#                                   BUSINESS TRIP REQUEST                                                  #