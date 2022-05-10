#include <stdio.h>
int GLOBAL = 0;
int main() {
   int a = 5;
   int b = 5;
   int c = 0;
   a = 10;
   c = a + b;
   //printf("Result = %d\n", c);
   
   return 0;
}
