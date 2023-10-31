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
class ActionHelloWorld(Action):

    def name(self) -> Text:
        return "action_greet"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        dispatcher.utter_message(text="Hi, How can i Help you..")

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
        # prnotext = tracker.latest_message["text"]
        prno = tracker.get_slot("prnumber")
        # prno = prnotext.split()[-1]
        print(prno)
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
        # prnotext = tracker.latest_message["text"]
        # print(prnotext)
        prno = tracker.get_slot('prnumber')
        pritemno = tracker.get_slot('pritemnumber')
        print(prno,pritemno)
        resp = pr_item_description(prno,pritemno)
        if resp['Item Number'] == 10:
            Pending_PR_Flag = 0
        else:
            Pending_PR_Flag = 1
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
        # print("Inside PR Approval")
        # prnotext = tracker.latest_message["text"]
        # print(prnotext)
        # prno = prnotext.split()[-1]
        prno = tracker.get_slot('prnumber')
        print(prno)
        # prno = 1000000475
        status = 'Approved'
        comments = 'Nil'
        res = pr_approval(prno,status,comments)
        print(res)
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
        print("Inside PR Reject")
        # prnotext = tracker.latest_message["text"]
        prno = tracker.get_slot('prnumber')
        metadata = tracker.latest_message.get("metadata")
        # prno = prnotext.split()[-1]
        status = 'Rejected'
        if metadata:
            comments = metadata['comments']
        else:
            comments = 'Nil'
        res = pr_approval(prno,status,comments)
        print(res)
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
        pendingpo = [str(i) for i in list]
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

        # ponotext = tracker.latest_message["text"]
        # pono = ponotext.split()[-1]
        pono = tracker.get_slot('ponumber')
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
        
        # ponotext = tracker.latest_message["text"]
        # poitemno = ponotext.split()[-1]
        # pono = ponotext.split()[1]
        pono = tracker.get_slot("ponumber")
        poitemno = tracker.get_slot("poitemnumber")
        resp = po_item_description(pono)
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
        # ponotext = tracker.latest_message["text"]
        # pono = ponotext.split()[-1]
        pono = tracker.get_slot('ponumber')
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
        # ponotext = tracker.latest_message["text"]
        metadata = tracker.latest_message.get("metadata")
        # pono = ponotext.split()[-1]
        pono = tracker.get_slot('ponumber')
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
        print("Action running")
        # plnotext = tracker.latest_message["text"]
        # plno = plnotext.split()[-1]
        plno = tracker.get_slot('LeaveId')
        print(plno)
        leave_req_details = leave_description(plno)
        print(leave_req_details)
        send = {
            "msg": "Here is the Details for the Leave request... ",
            "details": {
                "data":leave_req_details,"flag":True,
                "type": "PL"
                }
        }
        my_json = json.dumps(send)
        dispatcher.utter_message(text=my_json)
        
        return []
    
class ActionPLApprove(Action):

    def name(self) -> Text:
        return "action_pl_approve"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        # plnotext = tracker.latest_message["text"]
        # plno = plnotext.split()[-1]
        plno = tracker.get_slot('LeaveId')
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
        plno = tracker.get_slot("LeaveId")
        # print("PL Reject",pl_no)
        # dispatcher.utter_message(text="Leave Request Rejected")
        # plnotext = tracker.latest_message["text"]
        metadata = tracker.latest_message.get("metadata")
        # plno = plnotext.split()[-1]
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
            'SIRC Annual Leave' : '9',
            'SIRC Hajj Leave' : '3',
            'SIRC Unpaid Leave' : '4',
            'SIRC Examination Leave' : '2',
            'SIRC Sick Leave' : '4',
        }
        send = {"msg": "The available leaves of Ahmed are", "donut": leave_balance}
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
        pendingbt = [str(i) for i in resp]
        send = {"requests": pendingbt,
                    "msg": "The Pending Business trip request lists are given below. Choose Any one to see details",
                    }

        my_json = json.dumps(send)
        dispatcher.utter_message(text=my_json)

        return []

class ActionTripDescription(Action):

    def name(self) -> Text:
        return "action_trip_description"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        # btnotext = tracker.latest_message["text"]
        btno = tracker.get_slot('TripId')
        btno = btno.split()[-1][0:-1]
        trip_req_details = bt_description(btno)
        flag_variable = True
        send = {
            "msg": "Here is the Details for the Business Trip... ",
            "details": {
                "data":trip_req_details,"flag":flag_variable,
                "type": "BT"
                }
        }
        my_json = json.dumps(send)
        dispatcher.utter_message(text=my_json)

        return []
    
class ActionBTApprove(Action):

    def name(self) -> Text:
        return "action_bt_approve"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        # btnotext = tracker.latest_message["text"]
        btno = tracker.get_slot('TripId')
        btno = btno.split()[-1][0:-1]
        status = 'Approved'
        comments = 'Nil'
        res = bt_approval(btno,status,comments)
        if res:
            dispatcher.utter_message(text=f'BT {btno} was Approved Successfully')
        else:
            dispatcher.utter_message(text=f'BT {btno} has already been Approved/Rejected')
        
        return []
        
class ActionBTReject(Action):

    def name(self) -> Text:
        return "action_bt_reject"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        btno = tracker.get_slot("TripId")
        # print("BT Reject",BT_no)
        # dispatcher.utter_message(text="Business Trip Request Rejected")
        # btnotext = tracker.latest_message["text"]
        metadata = tracker.latest_message.get("metadata")
        btno = btno.split()[-1][0:-1]
        status = 'Rejected'
        if metadata:
            comments = metadata['comments']
        else:
            comments = 'Nil'
        res = bt_approval(btno,status,comments)
        if res:
            dispatcher.utter_message(text=f'BT {btno} was Rejected Successfully')
        else:
            dispatcher.utter_message(text=f'BT {btno} has already been Approved/Rejected')


        return []
    

#                                   BUSINESS TRIP REQUEST                                                  #

#                                       BUDGET DETAILS                                                   #

# class FundcentreList(Action):

#     def name(self) -> Text:
#         return "action_fund_centre"

#     def run(self, dispatcher: CollectingDispatcher,
#             tracker: Tracker,
#             domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
#         resp = fundcentre_list()
#         fccentre = [i for i in resp]
#         send = {
#             "data":fccentre,"flag":False,
#             "msg": "Here is the List of Fund Centres... ",
                      
#         }
#         my_json = json.dumps(send)
#         dispatcher.utter_message(text=my_json)


#         return []
    
# class CommitmentItemsList(Action):

#     def name(self) -> Text:
#         return "action_commit_item"

#     def run(self, dispatcher: CollectingDispatcher,
#             tracker: Tracker,
#             domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
#         # fc_no = tracker.get_slot("fc_no")
#         fc_notext = tracker.latest_message["text"]
#         print(fc_notext)
#         fc_no = fc_notext.split()[-1]
#         print(fc_no)
#         fc_num = fc_notext.split[1]
#         resp = commititem_list(fc_no,fc_num)
#         ciitem = [i for i in resp]
#         print(resp)
#         send = {
#                     "msg": "The Commitment Items are given below. Choose Any one to see details",
#                     "data": ciitem,
#                     }

#         my_json = json.dumps(send)
#         dispatcher.utter_message(text=my_json)


#         return []
    
# class BudgetDetails(Action):

#     def name(self) -> Text:
#         return "action_budget_details"

#     def run(self, dispatcher: CollectingDispatcher,
#             tracker: Tracker,
#             domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
#         budget_notext = tracker.latest_message["text"]
#         fc_no = budget_notext.split()[1]
#         print(fc_no)
#         ci_no = budget_notext.split()[-1]
#         print(ci_no)
#         resp = budget_description(fc_no,ci_no)
#         print(resp)
#         send = {
#             "msg": f"Here are the Budget details of Fund centre: FC {fc_no}, Commitment Item: CI {ci_no} ... ",
#             "details": {
#                 "data":resp,"flag":False,
#                 "type": "BD"
#                 }
#         }
#         my_json = json.dumps(send)
#         dispatcher.utter_message(text=my_json)


#         return []
class FundcentreList(Action):
 
    def name(self) -> Text:
        return "action_fund_centre"
 
    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        resp = fundcentre_list()
        fccentre = [i for i in resp]
        send = {
                "data":fccentre,"flag":False,
                "msg": "Here is the List of Fund Centres... ",
               }
 
        my_json = json.dumps(send)
        dispatcher.utter_message(text=my_json)
 
 
        return []
   
class CommitmentItemsList(Action):
 
    def name(self) -> Text:
        return "action_commit_item"
 
    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        # fc_no = tracker.get_slot("fc_no")
        fc_notext = tracker.latest_message["text"]
        print(fc_notext)
        fc_no = fc_notext.split()[-1]
        print(fc_no)
        resp = commititem_list(fc_no)
        print(resp)
        send = {"data": resp,
                    "msg": "The Commitment Items are given below. Choose Any one to see details",
                    }
 
        my_json = json.dumps(send)
        dispatcher.utter_message(text=my_json)
 
 
        return []
   
class BudgetDetails(Action):
 
    def name(self) -> Text:
        return "action_budget_details"
 
    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        budget_notext = tracker.latest_message["text"]
        fc_no = budget_notext.split()[1]
        print(fc_no)
        ci_no = budget_notext.split()[-1]
        print(ci_no)
        resp = budget_description(fc_no,ci_no)
        print(resp)
        send = {
            "msg": f"Here are the Budget details of Fund centre: FC {fc_no}, Commitment Item: CI {ci_no} ...",
            "details": {
                "data":resp,"flag":False,
                "type": "BD"
                }
        }
        my_json = json.dumps(send)
        dispatcher.utter_message(text=my_json)
 
 
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
                    "link": "http://172.29.106.60:8000/static_files/Learning%20and%20Development.pdf",
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
                    "link": "http://172.29.106.60:8000/static_files/Talent%20Acquisition.pdf",
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
                    "link": "http://172.29.106.60:8000/static_files/Organizational%20Development.pdf",
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
                    "link": "http://172.29.106.60:8000/static_files/Leave%20Management%20Polcies.pdf",
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
                    "link": "http://172.29.106.60:8000/static_files/Grievance_Policies.pdf",
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
                    "link": "http://172.29.106.60:8000/static_files/Personnel%20Records%20Policies.pdf",
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
                    "link": "http://172.29.106.60:8000/static_files/Payroll%20Policies.pdf",
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
                    "link": "http://172.29.106.60:8000/static_files/Working%20Hours%20Policies.pdf",
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
                    "link": "http://172.29.106.60:8000/static_files/Separation%20Employment%20Policies.pdf",
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
                    "link": "http://172.29.106.60:8000/static_files/Travel%20and%20Business%20Trips%20Policeis%20.pdf",
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
        resp = ['Human Resource Policies','Information Technology Policies','Procurement Policies']
        send = {
            "msg": "Please select the Policy group to view the policies",
            "requests":resp
            
        }
        my_json = json.dumps(send)
        dispatcher.utter_message(text=my_json)

        return []
    

class ActionHRPolicies(Action):
    def name(self) -> Text:
        return "action_hr_policies"

    def run(
        self,
        dispatcher: CollectingDispatcher,
        tracker: Tracker,
        domain: Dict[Text, Any],
    ) -> List[Dict[Text, Any]]:
        
        links = [
                {
                    "tag": "Travel and Business Trip Policy",
                    "link": "http://172.29.106.60:8000/static_files/Travel%20and%20Business%20Trips%20Policeis%20.pdf"},
                    {"tag": "Learning And Development Policies",
                    "link": "http://172.29.106.60:8000/static_files/Learning%20and%20Development.pdf"},
                    {"tag": "Talent Acquisition Policy",
                    "link": "http://172.29.106.60:8000/static_files/Talent%20Acquisition.pdf"},
                    {"tag": "Organizational Development Policies",
                    "link": "http://172.29.106.60:8000/static_files/Organizational%20Development.pdf"},
                    {"tag": "Leave Management Policy",
                    "link": "http://172.29.106.60:8000/static_files/Leave%20Management%20Polcies.pdf"},
                    {"tag": "Grievance Policy",
                    "link": "http://172.29.106.60:8000/static_files/Grievance_Policies.pdf"},
                    {"tag": "Personnel Policies",
                    "link": "http://172.29.106.60:8000/static_files/Personnel%20Records%20Policies.pdf"},
                    {"tag": "Payroll Policies",
                    "link": "http://172.29.106.60:8000/static_files/Payroll%20Policies.pdf"},
                    {"tag": "Separation Policy",
                    "link": "http://172.29.106.60:8000/static_files/Separation%20Employment%20Policies.pdf"},
                    {
                    "tag": "Working Hours Policy",
                    "link": "http://172.29.106.60:8000/static_files/Working%20Hours%20Policies.pdf"
                },
                
            ]
        send = {"links":links,"msg":"The Company policies are.."}
        my_json = json.dumps(send)
        dispatcher.utter_message(text=my_json)

        return []
    
class ActionITPolicies(Action):
    def name(self) -> Text:
        return "action_it_policies"

    def run(
        self,
        dispatcher: CollectingDispatcher,
        tracker: Tracker,
        domain: Dict[Text, Any],
    ) -> List[Dict[Text, Any]]:
        # resp = ['Human Resource Policies','IT Policies','Procurement Policies']
        send = {
            "msg": "You are not Authorized to view the policies",            
        }
        my_json = json.dumps(send)
        dispatcher.utter_message(text=my_json)

        return []
    
class ActionPRPolicies(Action):
    def name(self) -> Text:
        return "action_procurement_policies"

    def run(
        self,
        dispatcher: CollectingDispatcher,
        tracker: Tracker,
        domain: Dict[Text, Any],
    ) -> List[Dict[Text, Any]]:
        # resp = ['Human Resource Policies','IT Policies','Procurement Policies']
        send = {
            "msg": "You are not Authorized to view the policies",            
        }
        my_json = json.dumps(send)
        dispatcher.utter_message(text=my_json)

        return []