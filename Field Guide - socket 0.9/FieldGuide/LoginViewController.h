//
//  LoginViewController.h
//  FieldGuide
//
//  Created by David Stubbs on 2014-11-26.
//  Copyright (c) 2014 DS. All rights reserved.
//

#import <UIKit/UIKit.h>

@interface LoginViewController : UIViewController

@property (strong, nonatomic) IBOutlet UILabel *roomHashLabel;
@property (strong) IBOutlet UIButton *loginButton;

- (IBAction)doStartButton;
- (void)checkRoomConnection;

@end
