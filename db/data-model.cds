using { cuid, managed } from '@sap/cds/common'; 

namespace fullstack_dev_challenge; 

entity Tests : managed{ 
  key ID          : UUID @(Core.Computed: true);
  title: String ;
  description: String ;
  questions : Association to many Questions on questions.test = $self ;
  test: String ;
} 

entity Questions: managed { 
  key ID          : UUID @(Core.Computed: true);
  text:String;
  answer: Composition of one Answers;
  test:Association to Tests;
  critical : Integer ;
} 

aspect Answers { 
  key ID          : UUID @(Core.Computed: true);
  text:String;
} 