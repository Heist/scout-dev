//
//  MasterViewController.h
//  FieldGuide
//
//  Created by David Stubbs on 2014-10-22.
//  Copyright (c) 2014 DS. All rights reserved.
//

#import <UIKit/UIKit.h>

@interface DetailViewController : UIViewController <UIWebViewDelegate>

@property (nonatomic, strong) id detailItem;

@property (strong) IBOutlet UIWebView *webView;
//@property (strong) IBOutlet FXBlurView *blurView;
@property (strong, nonatomic) IBOutlet UIButton *endCallButton;

- (IBAction)endCall:(id)sender;
- (void)endTest;
@end
