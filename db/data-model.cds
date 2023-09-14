using { cuid, managed } from '@sap/cds/common'; 

namespace fullstack_dev_challenge; 

entity Tests { 
  key ID: UUID ;
  title: String ;
  description: String ;
  createdAt: DateTime ;
  createdBy: String ;
  modifiedAt: DateTime ;
  modifiedBy : String;
  questions : Association to many Questions on questions.test = $self ;
} 

entity Questions { 
  key ID:UUID;
  text:String;
  answer: Composition of one Answers;
  test:Association to Tests;
} 

aspect Answers { 
  key ID:UUID;
  text:String;
} 