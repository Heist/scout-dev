//
//  LoginViewController.m
//  FieldGuide
//
//  Created by David Stubbs on 2014-11-26.
//  Copyright (c) 2014 DS. All rights reserved.
//

#import "LoginViewController.h"
#import "MySingleton.h"
#import <CommonCrypto/CommonDigest.h>

@implementation LoginViewController
{
    NSString *hash;
    
}

- (id)initWithNibName:(NSString *)nibNameOrNil bundle:(NSBundle *)nibBundleOrNil
{
    
    self = [super initWithNibName:nibNameOrNil bundle:nibBundleOrNil];
    if (self) {
        
    }
    
    //sharedLoginViewController = self;
    
    return self;
}


-(id)initWithCoder: (NSCoder *)aDecoder
{
    if ((self = [super initWithCoder: aDecoder]) == nil)
    {
        return nil;
    }
    
    [MySingleton sharedMySingleton].sharedLoginViewController = self;
    
    return self;
    
}

- (void)viewDidLoad
{
    [super viewDidLoad];
    
    //Make sure the status bar is set back to white
    [UIApplication sharedApplication].statusBarStyle = UIStatusBarStyleLightContent;
    
    hash = [self md5: [[[UIDevice currentDevice] identifierForVendor] UUIDString]];
    hash = [hash substringWithRange:NSMakeRange(0, 8)];
    
    _roomHashLabel.text = hash;
    
    [self checkRoomConnection];
    
}

-(void)checkRoomConnection{
    
    BOOL isConnected = [MySingleton sharedMySingleton].isConnected;
    //NSLog(@"didReceiveEvent >>> data: %hhd", isConnected);
    
    //NSLog(@"didReceiveEvent >>> data: %hhd", isConnectedToRoom);
    
    if (isConnected == YES) {
        _loginButton.alpha = 1;
        _loginButton.enabled = TRUE;
        
        [UIView animateWithDuration:0.6 animations:^{
            _loginButton.backgroundColor = [UIColor colorWithRed:111.0/255.0 green:191.0/255.0 blue:60.0/255.0 alpha:1];
        }];
        
        [_loginButton setTitle: @"START" forState: UIControlStateNormal];
        
    } else {
        _loginButton.alpha = 0.4;
    _loginButton.enabled = FALSE;
        [_loginButton setTitle: @"Waiting for room connection..." forState: UIControlStateNormal];
    }
}

-(void)doStartButton{
    
    //TODO rename these methods & segue name ID
    [self performSegueWithIdentifier:@"linkList" sender:self];
    
}


//Generate the room number
- (NSString *) md5:(NSString *) input
{
    const char *cStr = [input UTF8String];
    unsigned char digest[16];
    CC_MD5( cStr, strlen(cStr), digest ); // This is the md5 call
    
    NSMutableString *output = [NSMutableString stringWithCapacity:CC_MD5_DIGEST_LENGTH * 2];
    
    for(int i = 0; i < CC_MD5_DIGEST_LENGTH; i++)
        [output appendFormat:@"%02x", digest[i]];
    
    return output;
}

@end
