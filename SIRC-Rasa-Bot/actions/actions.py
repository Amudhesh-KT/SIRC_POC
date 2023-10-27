from typing import Any, Text, Dict, List
import json
from rasa_sdk import Action, Tracker
from rasa_sdk.executor import CollectingDispatcher
from actions.api import pending_pr_list,pr_item_list,pr_item_description,pending_po_list,po_item_list,po_item_description,pr_approval,po_approval,pending_leave_id,leave_description,leave_approval,pending_bt_list,bt_description,bt_approval,commititem_list,fundcentre_list,budget_description

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
        list = pending_pr_list()
        res = json.dumps(list)
        dispatcher.utter_message(text=res)

        return []
    
class ActionPRItemList(Action):

    def name(self) -> Text:
        return "action_pr_itemlist"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        # pr_no = tracker.get_slot("prnumber")
        # print("PR itemlist",pr_no)
        pr_no = 1000000475
        resp =pr_item_list(pr_no)
        res = json.dumps(resp)
        dispatcher.utter_message(text=res)

        return []
    
class ActionPRItemDescription(Action):

    def name(self) -> Text:
        return "action_pr_description"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        # pr_no = tracker.get_slot("prnumber")
        # item_no = tracker.get_slot("pritemnumber")
        pr_no = 1000000475
        pr_item = 10
        print("PR description",pr_no,",",pr_item)
        resp = pr_item_description(pr_no,pr_item)
        res = json.dumps(resp)
        dispatcher.utter_message(text=res)

        return []
    
class ActionPRApprove(Action):

    def name(self) -> Text:
        return "action_pr_approve"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        # pr_no = tracker.get_slot("prnumber")
        # print("PR approve",pr_no)
        pr_no = 1000000475
        status = 'Approved'
        res = pr_approval(pr_no,status)
        resp = json.dumps(res)
        dispatcher.utter_message(text=resp)

        return []
    
class ActionPRReject(Action):

    def name(self) -> Text:
        return "action_pr_reject"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        # pr_no = tracker.get_slot("prnumber")
        # print("PR reject",pr_no)
        # dispatcher.utter_message(text="Purchase Request Rejected")
        pr_no = 1000000475
        status = 'Rejected'
        res = pr_approval(pr_no,status)
        resp = json.dumps(res)
        dispatcher.utter_message(text=resp)
        return []
    
#                                     PURCHASE REQUEST                                                #

#                                          PURCHASE ORDER                                                  #

class ActionPendingPO(Action):

    def name(self) -> Text:
        return "action_pending_po"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        list = pending_po_list()
        res = json.dumps(list)
        dispatcher.utter_message(text=res)
        # dispatcher.utter_message(text="Purchase Order")

        return []

class ActionPOItemList(Action):

    def name(self) -> Text:
        return "action_po_itemlist"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        # po_no = tracker.get_slot("ponumber")
        # print("PO itemlist",po_no)
        po_no = 4500001416
        resp =po_item_list(po_no)
        res = json.dumps(resp)
        dispatcher.utter_message(text=res)
        dispatcher.utter_message(text="Purchase Order Item List")

        return []
    
class ActionPOItemDescription(Action):

    def name(self) -> Text:
        return "action_po_description"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        # po_no = tracker.get_slot("ponumber")
        # item_no = tracker.get_slot("poitemnumber")
        po_no = 4500001416
        # print("PR description",pr_no,",",pr_item)
        resp = po_item_description(po_no)
        res = json.dumps(resp)
        # print("PO Description",po_no,",",item_no)
        dispatcher.utter_message(text=res)

        return []

class ActionPOApprove(Action):

    def name(self) -> Text:
        return "action_po_approve"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        # po_no = tracker.get_slot("ponumber")
        # print("PO Approve",po_no)
        # dispatcher.utter_message(text="Purchase Order Approved")
        po_no = 4500001416
        status = 'Approved'
        res = po_approval(po_no,status)
        resp = json.dumps(res)
        dispatcher.utter_message(text=resp)

        return []
        
class ActionPOReject(Action):

    def name(self) -> Text:
        return "action_po_reject"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        # po_no = tracker.get_slot("ponumber")
        # print("PO Reject",po_no)
        # dispatcher.utter_message(text="Purchase Order Rejected")
        po_no = 4500001416
        status = 'Rejected'
        res = po_approval(po_no,status)
        resp = json.dumps(res)
        dispatcher.utter_message(text=resp)

        return []
    

#                                          PURCHASE ORDER                                                  #

#                                          LEAVE REQUEST                                                  #

class ActionPendingLeave(Action):

    def name(self) -> Text:
        return "action_pending_leave"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        resp = pending_leave_id()
        res = json.dumps(resp)
        dispatcher.utter_message(text=res)

        return []

class ActionLeaveDescription(Action):

    def name(self) -> Text:
        return "action_leave_description"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        # pl_no = tracker.get_slot("LeaveId")
        # print("Leave Description",pl_no)
        pl_no = "6862L"
        resp = leave_description(pl_no)
        res = json.dumps(resp)
        dispatcher.utter_message(text=res)

        return []
    
class ActionPLApprove(Action):

    def name(self) -> Text:
        return "action_pl_approve"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        # pl_no = tracker.get_slot("LeaveId")
        # print("PL Approve",pl_no)
        # dispatcher.utter_message(text="Leave Request Approved")
        pl_no = "6862L"
        status = 'Approved'        
        resp = leave_approval(pl_no,status)
        res = json.dumps(resp)
        dispatcher.utter_message(text=res)

        return []
        
class ActionPLReject(Action):

    def name(self) -> Text:
        return "action_pl_reject"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        # pl_no = tracker.get_slot("LeaveId")
        # print("PL Reject",pl_no)
        # dispatcher.utter_message(text="Leave Request Rejected")
        pl_no = "6862L"
        status = 'Rejected'        
        resp = leave_approval(pl_no,status)
        res = json.dumps(resp)
        dispatcher.utter_message(text=res)

        return []
    

#                                          LEAVE REQUEST                                                  #


#                                    BUSINESS TRIP REQUEST                                                #

class ActionPendingTrip(Action):

    def name(self) -> Text:
        return "action_pending_trip"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:

        # dispatcher.utter_message(text="Trip Request")
        resp = pending_bt_list()
        res = json.dumps(resp)
        dispatcher.utter_message(text=res)

        return []

class ActionTripDescription(Action):

    def name(self) -> Text:
        return "action_trip_description"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        # bt_no = tracker.get_slot("TripId")
        # print("Trip Description",bt_no)
        # dispatcher.utter_message(text="Business Trip Description")
        bt_no = 1300539
        resp = bt_description(bt_no)
        res = json.dumps(resp)
        dispatcher.utter_message(text=res)

        return []
    
class ActionBTApprove(Action):

    def name(self) -> Text:
        return "action_bt_approve"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        # BT_no = tracker.get_slot("TripId")
        # print("BT Approve",BT_no)
        # dispatcher.utter_message(text="Business Trip Request Approved")
        bt_no = 1300539
        status = 'Approved'        
        resp = bt_approval(bt_no,status)
        res = json.dumps(resp)
        dispatcher.utter_message(text=res)

        return []
        
class ActionBTReject(Action):

    def name(self) -> Text:
        return "action_bt_reject"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        # BT_no = tracker.get_slot("TripId")
        # print("BT Reject",BT_no)
        # dispatcher.utter_message(text="Business Trip Request Rejected")
        bt_no = 1300539
        status = 'Rejected'        
        resp = bt_approval(bt_no,status)
        res = json.dumps(resp)
        dispatcher.utter_message(text=res)

        return []
    

#                                   BUSINESS TRIP REQUEST                                                  #

#                                       BUDGET DETAILS                                                   #

class FundcentreList(Action):

    def name(self) -> Text:
        return "action_fund_centre"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        resp = fundcentre_list()
        res = json.dumps(resp)
        dispatcher.utter_message(text=res)


        return []
    
class CommitmentItemsList(Action):

    def name(self) -> Text:
        return "action_commit_item"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        # fc_no = tracker.get_slot("fc_no")
        fc_no = 1014000
        resp = commititem_list(fc_no)
        res = json.dumps(resp)
        dispatcher.utter_message(text=res)


        return []
    
class BudgetDetails(Action):

    def name(self) -> Text:
        return "action_budget_details"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        # fc_no = tracker.get_slot("fc_no")
        # ci_no = tracker.get_slot("ci_no")
        fc_no = 1014000
        ci_no = 810006
        resp = budget_description()
        res = json.dumps(resp)
        dispatcher.utter_message(text=res)


        return []

#                                 BUDGET DETAILS REQUEST                                                  #