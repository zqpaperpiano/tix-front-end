import React from 'react';
import './FAQ.css';

export const FAQ = () => {
   return(
        <div className="FAQs">
        <div className="one-faq">
            <div className='question'>
                I want to purchase tickets. Why is there a ticket limit?
            </div>
            <div className='answer'>
                {`In short, we want to make sure that everyone gets a fair chance to buy tickets the limit's there to keep the first person in the queue from 
                buying up all the best seats and leaving nothing for everyone behind them! Ticket limits apply to ensure fair access to tickets for fans
                , and as a measure to minimise ticket scalping. The ticket limits are set by the event organizers. 
                If the number of people in your party exceeds the ticket limit, another member of the group would need to book with another Ticketmaster account.
                If your party is making multiple bookings, unfortunately, we are unable to guarantee that all the seats will be together 
                especially for big events where tickets are likely to sell out very quickly.`}
            </div>

            <div className='question'>
                Why is there a time limit to purchase tickets online?
            </div>
            <div className='answer'>
                {`There is a time limit applied to all transactions as they’re progressed through the ticket purchasing stages. 
                This time limit gives all fans an equal opportunity to secure tickets for the event. Remember to keep track of time and move through the processing pages as quickly as possible. 
                When you have exceeded the time limit, any tickets in your cart will be removed and you will need to reload the purchase page and try again.  `}
            </div>

            <div className='question'>
                What is the refund and exchange policy
            </div>
            <div className='answer'>
                {`While we do not accept exhanges, in the event that you are unable to attend the concert due to any reason, you are able to re-sell the ticket back onto our website
                via the 'sell ticket' button in your profile, next to the corresponding ticket. Do ensure that you are selling the correct ticket, as we cannot guarantee that you 
                will be able to get the same ticket back in the event of selling the wrong ticket.
                The full amount you paid for the ticket will also be credited into your bank account within 7 working days. 
                For more information, feel free to contact our staff  `}
            </div>

            <div className='question'>
                 Is it necessary for the recipient of the transferred ticket(s) to have a Ticketmaster account?
            </div>
            <div className='answer'>
                {`Yes, and the person will need to create one if they are new to Ticketmaster. If they already have an account,
                they can log in to their Ticketmaster account and follow the steps to accept the transferred tickets. `}
            </div>
        </div>
    </div>
   );
}