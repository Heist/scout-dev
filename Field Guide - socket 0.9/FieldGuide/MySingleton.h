//
//  MySingleton.h
//
//  Created by Barrett A Breshears
//

#import <Foundation/Foundation.h>
#import "LoginViewController.h"

@interface MySingleton : NSObject

@property (nonatomic, retain) NSString *roomNumber;
@property (assign) BOOL isConnected;
@property (nonatomic, strong) LoginViewController *sharedLoginViewController;

+(MySingleton *)sharedMySingleton;

@end