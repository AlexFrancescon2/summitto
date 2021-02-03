
# RefundApp
## 1) Part 1- Project
### Dev tests:
**Operating system:**

 Windows 10.

**Tested browsers:** 

Firefox, Chrome, Edge, Opera.

**Development time:**

Full 10 hours.

**Conceptual synthesis:**

Having at the current moment no knowledge with React.js, the App has been developed with JavaScript, HTML and CSS.
The App is divided in two sections:
- a landing page (index.html) which introduces the functionalities of the app
- the logic page (logic.html) which stores the main functionality of the app

This App allows the users to upload their invoices (at the actual moment through the formats PNG, JPG e JPEG), having its information extrapolated and eventually apply for a refund entering the percentage of refund. The invoices are saved in a JavaScript array of Invoices, which gets resetted every time the session changes.

The invoices are acquired thanks to the JavaScript library __"Tesseract.js"__; this library allows to read an image file and to extract its content in pure text.

Through a series of assumptions the app recognizes the total amount of the invoice and the tax rate, which will be saved later in an Invoice variable along with the text, the currency and some other additional data.

Once all the data have been acquired without errors, the app will later ask to the user if he would like to refund the invoice and, in case, the refund percentage. The full refund amount will be displayed in real time.

Purely for this project purposes, the app will display the uploaded invoices with all the information acquired; The content of the will not be displayed by stylistc choice. But to notice, the content will be present anyway in the javaScript variable and ready to use.

Better is the quality of the image, better is the result.

On the project file "invoices" you will find the sample invoices that I used to test the functionality on various browsers.

## 2) Part 2 - Question
I think this question could be analyzed under two different points of view:

1) under the pure design style, UX, feeling and satisfaction provided;

2) as a pure digital product, in relation to the goal that bears the App and functionalities it
must provide;

For me, a well-designed web application has to have a good score on the two aforementioned points.

I may be 'obvious', but I think that what did Apple to sponsor the Airpad Pro is really amazing: https://www.apple.com/it/airpods-pro/. 
As far as it's a static website, it bears an amazing design and it never gets boring to scroll. However, it is delicate. As mesmerizing as it is, perhaps it's too long; it's really difficult to search for certain informations: as far as
the focus is "the WOW effect", perhaps after the second visit on the page it becomes redundant. 

Perhaps a compromise between the length of the page/animations and the arrangement of the information, or the introduction of a search index would certainly have helped. In my opinion it was a real brazen challenge: if it hadn't been so fluid, it would have been a probably fail.


Others small mentions I would like to make, are UberEats and Alibaba. 

They're not famous for their striking design (although the for UberEats the speech is different � with the target
to strike as mobile application - but still raised from a branch of Uber and imposed itsef as GrubHub service), but for as they fulfill the goal they're designed for, in mention to the second point.

During my previous experience, with the team we had to design some pages for the ecommerce we were building, and it characteristics were similar to Alibaba's ones. I used to take inspirations from it, since it's a similar ecosystem well studied and worked in.

I guess they really simplified the design to guarantee the easiets usability to their targets.

But, I also think that it wasn't the only solution.

I'm a fan of the well weighted, adjusted and thoughtful compromises when it's necessary; in short terms, in my opinion, the design could be better: the product animation are bland with a short zoom-in, just to provide a dynamism that at the end doesn't strike at all; also, small overlays animations (with bugs) give a "old style design" sensation.

On the contrary, the structure seem to have been studied in the best way, to ensure the correct arrangement of the elements on the page, helping the user to navigate easily.
