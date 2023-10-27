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
        pendingpr = [str(i) for i in list]
        send = {"requests": pendingpr,
                    "msg": "The Pending PR lists are given below. Choose Any one to see PR Items",
                    }
        my_json = json.dumps(send)
        dispatcher.utter_message(text=my_json)
        return []
    
class ActionPRItemList(Action):

    def name(self) -> Text:
        return "action_pr_itemlist"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        prnotext = tracker.latest_message["text"]
        prno = prnotext.split()[-1]
        itemlist = pr_item_list(prno)
        send = {
            "data": itemlist,
            "msg": "The PR items lists are given below. Choose Any one to see the Item description",
        }
        my_json = json.dumps(send)
        dispatcher.utter_message(text=my_json)
        return []
    
class ActionPRItemDescription(Action):

    def name(self) -> Text:
        return "action_pr_description"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        Pending_PR_Flag = 1
        prnotext = tracker.latest_message["text"]
        print(prnotext)
        pritemno = prnotext.split()[-1]
        prno = prnotext.split()[1]
        print(prno,pritemno)
        resp = pr_item_description(prno,pritemno)
        send = {
            "msg": "Here is the Details of Purchase Requisition... ",
            "details": {
                "data":resp,"flag":Pending_PR_Flag,"type":"PR"
                }
        }
        
        my_json = json.dumps(send)
        dispatcher.utter_message(text=my_json)

        return []
    
class ActionPRApprove(Action):

    def name(self) -> Text:
        return "action_pr_approve"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:

        prnotext = tracker.latest_message["text"]
        prno = prnotext.split()[-1]
        status = 'Approved'
        comments = 'Nil'
        res = pr_approval(prno,status,comments)
        if res:
            dispatcher.utter_message(text=f'PR {prno} was Approved Successfully')
        else:
            dispatcher.utter_message(text=f'PR {prno} has already been Approved/Rejected')

        return []
    
class ActionPRReject(Action):

    def name(self) -> Text:
        return "action_pr_reject"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:

        prnotext = tracker.latest_message["text"]
        metadata = tracker.latest_message.get("metadata")
        prno = prnotext.split()[-1]
        status = 'Rejected'
        if metadata:
            comments = metadata['comments']
        else:
            comments = 'Nil'
        res = pr_approval(prno,status,comments)
        if res:
            dispatcher.utter_message(text=f'PR {prno} was Rejected Successfully')
        else:
            dispatcher.utter_message(text=f'PR {prno} has already been Approved/Rejected')

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
        pendingpo = ['PO '+str(i) for i in list]
        send = {"requests": pendingpo,
                    "msg": "The Pending PO lists are given below. Choose Any one to see PO Items",
                    }

        my_json = json.dumps(send)
        dispatcher.utter_message(text=my_json)

        return []

class ActionPOItemList(Action):

    def name(self) -> Text:
        return "action_po_itemlist"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:

        ponotext = tracker.latest_message["text"]
        pono = ponotext.split()[-1]
        itemlist = po_item_list(pono)
        send = {
            "data": itemlist,
            "msg": "The PO items lists are given below. Choose Any one to see the Item description",
        }
        my_json = json.dumps(send)
        dispatcher.utter_message(text=my_json)
        return []
    
class ActionPOItemDescription(Action):

    def name(self) -> Text:
        return "action_po_description"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        # global Pending_PO_Flag 
        Pending_PO_Flag = 1
        
        ponotext = tracker.latest_message["text"]
        poitemno = ponotext.split()[-1]
        pono = ponotext.split()[1]
        # pono = tracker.get_slot("po_number")
        # poitemno = tracker.get_slot("po_itemnumber")
        resp = po_item_description(pono,poitemno)
        send = {
            "msg": "Here is the Details of Purchase Requisition... ",
            "details": {
                "data":resp,"flag":Pending_PO_Flag,"type":"PO"
                }
        }
        
        my_json = json.dumps(send)
        dispatcher.utter_message(text=my_json)

        return []

class ActionPOApprove(Action):

    def name(self) -> Text:
        return "action_po_approve"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        ponotext = tracker.latest_message["text"]
        pono = ponotext.split()[-1]
        status = 'Approved'
        comments = 'Nil'
        res = po_approval(pono,status,comments)
        if res:
            dispatcher.utter_message(text=f'PO {pono} was Approved Successfully')
        else:
            dispatcher.utter_message(text=f'PO {pono} has already been Approved/Rejected')


        return []
        
class ActionPOReject(Action):

    def name(self) -> Text:
        return "action_po_reject"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        ponotext = tracker.latest_message["text"]
        metadata = tracker.latest_message.get("metadata")
        pono = ponotext.split()[-1]
        status = 'Rejected'
        if metadata:
            comments = metadata['comments']
        else:
            comments = 'Nil'
        res = po_approval(pono,status,comments)
        if res:
            dispatcher.utter_message(text=f'PO {pono} was Rejected Successfully')
        else:
            dispatcher.utter_message(text=f'PO {pono} has already been Approved/Rejected')

        return []
    

#                                          PURCHASE ORDER                                                  #

#                                          LEAVE REQUEST                                                  #

class ActionPendingLeave(Action):

    def name(self) -> Text:
        return "action_pending_leave"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        leave_req_list = pending_leave_id()
        send = {
            "requests": leave_req_list,
            "msg": "The Pending Leave request ID are shown below. Choose Any one to see the leave details",
        }
        my_json = json.dumps(send)
        dispatcher.utter_message(text=my_json)

        return []

class ActionLeaveDescription(Action):

    def name(self) -> Text:
        return "action_leave_description"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:

        plnotext = tracker.latest_message["text"]
        plno = plnotext.split()[-1]
        leave_req_details = leave_description(plno)
        flag_variable = True
        send = {
            "msg": "Here is the Details for the Leave request... ",
            "details": {
                "data":leave_req_details,"flag":flag_variable,
                "type": "PL"
                }
        }
        return []
    
class ActionPLApprove(Action):

    def name(self) -> Text:
        return "action_pl_approve"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        plnotext = tracker.latest_message["text"]
        plno = plnotext.split()[-1]
        status = 'Approved'
        comments = 'Nil'
        res = leave_approval(plno,status,comments)
        if res:
            dispatcher.utter_message(text=f'PL {plno} was Approved Successfully')
        else:
            dispatcher.utter_message(text=f'PL {plno} has already been Approved/Rejected')


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
        plnotext = tracker.latest_message["text"]
        metadata = tracker.latest_message.get("metadata")
        plno = plnotext.split()[-1]
        status = 'Rejected'
        if metadata:
            comments = metadata['comments']
        else:
            comments = 'Nil'
        res = leave_approval(plno,status,comments)
        if res:
            dispatcher.utter_message(text=f'PL {plno} was Rejected Successfully')
        else:
            dispatcher.utter_message(text=f'PL {plno} has already been Approved/Rejected')


        return []
    
class ActionLeaveBalance(Action):

    def name(self) -> Text:
        return "action_leave_balance"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        leave_balance = {
            'SIRC Annual Leave' : '27',
            'SIRC Hajj Leave' : '6',
            'SIRC Marriage Leave' : '12',
            'SIRC Iddah Leave' : '7',
            'SIRC Paternity Leave' : '20',
            'SIRC Maternity Leave' : '80',
            'SIRC Examination Leave' : '10',
            'SIRC Unpaid Leave' : '9',
            'SIRC Sick Leave' : '8',
        }
        send = {"msg": "The available leaves are", "donut": leave_balance}
        my_json = json.dumps(send)
        dispatcher.utter_message(text=my_json)

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
        resp = budget_description(fc_no,ci_no)
        res = json.dumps(resp)
        dispatcher.utter_message(text=res)


        return []

#                                 BUDGET DETAILS REQUEST                                                  #


#                                 POLICIES                                                  #

class ActionLearningAndDevelopmentPoliciesPolicy(Action):
    def name(self) -> Text:
        return "action_LearningAndDevelopmentPolicies"

    def run(
        self,
        dispatcher: CollectingDispatcher,
        tracker: Tracker,
        domain: Dict[Text, Any],
    ) -> List[Dict[Text, Any]]:
        send = {
            "links": [
                {
                    "tag": "Learning And Development Policies",
                    "link": "https://kaartechit-my.sharepoint.com/:b:/r/personal/damudhesh_kaartech_com/Documents/Documents/Kaar_policies/POLICIES/Kaar%20Overtime%20Policy.pdf?csf=1&web=1&e=gy7927",
                }
            ]
        }
        my_json = json.dumps(send)
        dispatcher.utter_message(text=my_json)

        return []
    
class ActionTalentAcquisitionPolicyPolicy(Action):
    def name(self) -> Text:
        return "action_TalentAcquisitionPolicy"

    def run(
        self,
        dispatcher: CollectingDispatcher,
        tracker: Tracker,
        domain: Dict[Text, Any],
    ) -> List[Dict[Text, Any]]:
        send = {
            "links": [
                {
                    "tag": "Talent Acquisition Policy",
                    "link": "https://kaartechit-my.sharepoint.com/:b:/r/personal/damudhesh_kaartech_com/Documents/Documents/Kaar_policies/POLICIES/Kaar%20Overtime%20Policy.pdf?csf=1&web=1&e=gy7927",
                }
            ]
        }
        my_json = json.dumps(send)
        dispatcher.utter_message(text=my_json)

        return []

class ActionOrganizationalDevelopmentPolicies(Action):
    def name(self) -> Text:
        return "action_OrganizationalDevelopmentPolicies"

    def run(
        self,
        dispatcher: CollectingDispatcher,
        tracker: Tracker,
        domain: Dict[Text, Any],
    ) -> List[Dict[Text, Any]]:
        send = {
            "links": [
                {
                    "tag": "Organizational Development Policies",
                    "link": "https://kaartechit-my.sharepoint.com/:b:/r/personal/damudhesh_kaartech_com/Documents/Documents/Kaar_policies/POLICIES/Corporate%20Attire%20Policy.pdf?csf=1&web=1&e=nhNR98",
                }
            ]
        }
        my_json = json.dumps(send)
        dispatcher.utter_message(text=my_json)

        return []


class ActionLeavePolicy(Action):
    def name(self) -> Text:
        return "action_leavepolicies"

    def run(
        self,
        dispatcher: CollectingDispatcher,
        tracker: Tracker,
        domain: Dict[Text, Any],
    ) -> List[Dict[Text, Any]]:
        send = {
            "links": [
                {
                    "tag": "Leave Management Policy",
                    "link": "https://kaartechit-my.sharepoint.com/:b:/r/personal/damudhesh_kaartech_com/Documents/Documents/Kaar_policies/POLICIES/Kaar%20Overtime%20Policy.pdf?csf=1&web=1&e=gy7927",
                }
            ]
        }
        my_json = json.dumps(send)
        dispatcher.utter_message(text=my_json)

        return []


class ActionGrievancePolicy(Action):
    def name(self) -> Text:
        return "action_GrievancePolicy"

    def run(
        self,
        dispatcher: CollectingDispatcher,
        tracker: Tracker,
        domain: Dict[Text, Any],
    ) -> List[Dict[Text, Any]]:
        send = {
            "links": [
                {
                    "tag": "Grievance Policy",
                    "link": "https://kaartechit-my.sharepoint.com/:b:/r/personal/damudhesh_kaartech_com/Documents/Documents/Kaar_policies/POLICIES/Kaar%20Leave%20Policy%20-%20India.pdf?csf=1&web=1&e=h6mBdS, Others- https://kaartechit-my.sharepoint.com/:b:/r/personal/damudhesh_kaartech_com/Documents/Documents/Kaar_policies/POLICIES/KaarTech%20-%20Leave%20Policy.pdf?csf=1&web=1&e=hres42",
                }
            ]
        }
        my_json = json.dumps(send)
        dispatcher.utter_message(text=my_json)

        return []


class ActionPersonnelPolicies(Action):
    def name(self) -> Text:
        return "action_PersonnelPolicies"

    def run(
        self,
        dispatcher: CollectingDispatcher,
        tracker: Tracker,
        domain: Dict[Text, Any],
    ) -> List[Dict[Text, Any]]:
        send = {
            "links": [
                {
                    "tag": "Personnel Policies",
                    "link": "https://kaartechit-my.sharepoint.com/:b:/r/personal/damudhesh_kaartech_com/Documents/Documents/Kaar_policies/POLICIES/KaarTech%20-%20Travel%20Policy.pdf?csf=1&web=1&e=ia4gK9",
                }
            ]
        }
        my_json = json.dumps(send)
        dispatcher.utter_message(text=my_json)

        return []


class ActionPayrollPolicies(Action):
    def name(self) -> Text:
        return "action_PayrollPolicies"

    def run(
        self,
        dispatcher: CollectingDispatcher,
        tracker: Tracker,
        domain: Dict[Text, Any],
    ) -> List[Dict[Text, Any]]:
        send = {
            "links": [
                {
                    "tag": "Payroll Policies",
                    "link": "https://kaartechit-my.sharepoint.com/:b:/r/personal/damudhesh_kaartech_com/Documents/Documents/Kaar_policies/POLICIES/Additional%20Billing%20Hours%20Policy%20-%20UK%202.0.pdf?csf=1&web=1&e=i373nJ",
                }
            ]
        }
        my_json = json.dumps(send)
        dispatcher.utter_message(text=my_json)

        return []


class ActionWorkingHoursPolicy(Action):
    def name(self) -> Text:
        return "action_WorkingHoursPolicy"

    def run(
        self,
        dispatcher: CollectingDispatcher,
        tracker: Tracker,
        domain: Dict[Text, Any],
    ) -> List[Dict[Text, Any]]:
        send = {
            "links": [
                {
                    "tag": "Working Hours Policy",
                    "link": "https://kaartechit-my.sharepoint.com/:b:/r/personal/damudhesh_kaartech_com/Documents/Documents/Kaar_policies/POLICIES/Kaar%20Expenses%20Management%20System%20Policy.pdf?csf=1&web=1&e=Hwue5A",
                }
            ]
        }
        my_json = json.dumps(send)
        dispatcher.utter_message(text=my_json)

        return []


class ActionSeparationPolicy(Action):
    def name(self) -> Text:
        return "action_SeparationPolicy"

    def run(
        self,
        dispatcher: CollectingDispatcher,
        tracker: Tracker,
        domain: Dict[Text, Any],
    ) -> List[Dict[Text, Any]]:
        send = {
            "links": [
                {
                    "tag": "Separation Policy",
                    "link": "https://kaartechit-my.sharepoint.com/:b:/r/personal/damudhesh_kaartech_com/Documents/Documents/Kaar_policies/POLICIES/Kaar%20FTF%20Buckets%20Policy.pdf?csf=1&web=1&e=BYTeTJ",
                }
            ]
        }
        my_json = json.dumps(send)
        dispatcher.utter_message(text=my_json)

        return []
    

class Actiontravelpolicies(Action):
    def name(self) -> Text:
        return "action_travelpolicies"

    def run(
        self,
        dispatcher: CollectingDispatcher,
        tracker: Tracker,
        domain: Dict[Text, Any],
    ) -> List[Dict[Text, Any]]:
        send = {
            "links": [
                {
                    "tag": "Travel and Business Trip Policy",
                    "link": "https://kaartechit-my.sharepoint.com/:b:/r/personal/damudhesh_kaartech_com/Documents/Documents/Kaar_policies/POLICIES/Kaar%20FTF%20Buckets%20Policy.pdf?csf=1&web=1&e=BYTeTJ",
                }
            ]
        }
        my_json = json.dumps(send)
        dispatcher.utter_message(text=my_json)

        return []
    

class ActionPolicies(Action):
    def name(self) -> Text:
        return "action_policies"

    def run(
        self,
        dispatcher: CollectingDispatcher,
        tracker: Tracker,
        domain: Dict[Text, Any],
    ) -> List[Dict[Text, Any]]:
        send = {
            "links": [
                {
                    "tag": "Travel and Business Trip Policy",
                    "link": "https://kaartechit-my.sharepoint.com/:b:/r/personal/damudhesh_kaartech_com/Documents/Documents/Kaar_policies/POLICIES/Kaar%20FTF%20Buckets%20Policy.pdf?csf=1&web=1&e=BYTeTJ",
                    "tag": "Learning And Development Policies",
                    "link": "https://kaartechit-my.sharepoint.com/:b:/r/personal/damudhesh_kaartech_com/Documents/Documents/Kaar_policies/POLICIES/Kaar%20Overtime%20Policy.pdf?csf=1&web=1&e=gy7927",
                    "tag": "Talent Acquisition Policy",
                    "link": "https://kaartechit-my.sharepoint.com/:b:/r/personal/damudhesh_kaartech_com/Documents/Documents/Kaar_policies/POLICIES/Kaar%20Overtime%20Policy.pdf?csf=1&web=1&e=gy7927",
                     "tag": "Organizational Development Policies",
                    "link": "https://kaartechit-my.sharepoint.com/:b:/r/personal/damudhesh_kaartech_com/Documents/Documents/Kaar_policies/POLICIES/Corporate%20Attire%20Policy.pdf?csf=1&web=1&e=nhNR98",
                    "tag": "Leave Management Policy",
                    "link": "https://kaartechit-my.sharepoint.com/:b:/r/personal/damudhesh_kaartech_com/Documents/Documents/Kaar_policies/POLICIES/Kaar%20Overtime%20Policy.pdf?csf=1&web=1&e=gy7927",
                    "tag": "Grievance Policy",
                    "link": "https://kaartechit-my.sharepoint.com/:b:/r/personal/damudhesh_kaartech_com/Documents/Documents/Kaar_policies/POLICIES/Kaar%20Leave%20Policy%20-%20India.pdf?csf=1&web=1&e=h6mBdS, Others- https://kaartechit-my.sharepoint.com/:b:/r/personal/damudhesh_kaartech_com/Documents/Documents/Kaar_policies/POLICIES/KaarTech%20-%20Leave%20Policy.pdf?csf=1&web=1&e=hres42",
                    "tag": "Personnel Policies",
                    "link": "https://kaartechit-my.sharepoint.com/:b:/r/personal/damudhesh_kaartech_com/Documents/Documents/Kaar_policies/POLICIES/KaarTech%20-%20Travel%20Policy.pdf?csf=1&web=1&e=ia4gK9",
                    "tag": "Payroll Policies",
                    "link": "https://kaartechit-my.sharepoint.com/:b:/r/personal/damudhesh_kaartech_com/Documents/Documents/Kaar_policies/POLICIES/Additional%20Billing%20Hours%20Policy%20-%20UK%202.0.pdf?csf=1&web=1&e=i373nJ",
                    "tag": "Working Hours Policy",
                    "link": "https://kaartechit-my.sharepoint.com/:b:/r/personal/damudhesh_kaartech_com/Documents/Documents/Kaar_policies/POLICIES/Kaar%20Expenses%20Management%20System%20Policy.pdf?csf=1&web=1&e=Hwue5A",
                    "tag": "Separation Policy",
                    "link": "https://kaartechit-my.sharepoint.com/:b:/r/personal/damudhesh_kaartech_com/Documents/Documents/Kaar_policies/POLICIES/Kaar%20FTF%20Buckets%20Policy.pdf?csf=1&web=1&e=BYTeTJ",
                }
            ]
        }
        my_json = json.dumps(send)
        dispatcher.utter_message(text=my_json)

        return []